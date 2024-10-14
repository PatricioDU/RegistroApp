import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
import { Usuario } from '../model/usuario';
import { BehaviorSubject } from 'rxjs';
import { NivelEducacional } from '../model/nivel-educacional';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  userUpgrades = [
    {
      toVersion: 1,
      statements: [`
      CREATE TABLE IF NOT EXISTS USUARIO (
        cuenta TEXT PRIMARY KEY NOT NULL,
        correo TEXT NOT NULL,
        password TEXT NOT NULL,
        preguntaSecreta TEXT NOT NULL,
        respuestaSecreta TEXT NOT NULL,
        nombre TEXT NOT NULL,
        apellido TEXT NOT NULL,
        nivelEducacional INTEGER NOT NULL,
        fechaNacimiento INTEGER NOT NULL
      );
      `]
    }
  ];

  sqlInsertUpdate = `
    INSERT OR REPLACE INTO USUARIO (
      cuenta, 
      correo, 
      password, 
      preguntaSecreta, 
      respuestaSecreta,
      nombre, 
      apellido,
      nivelEducacional, 
      fechaNacimiento
    ) VALUES (?,?,?,?,?,?,?,?,?);
  `;

  nombreBD = 'basedatos';
  db!: SQLiteDBConnection;
  listaUsuarios: BehaviorSubject<Usuario[]> = new BehaviorSubject<Usuario[]>([]);
  datosQR: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private sqliteService: SQLiteService) { }

  async inicializarBaseDeDatos() {
    await this.sqliteService.crearBaseDeDatos({database: this.nombreBD, upgrade: this.userUpgrades});
    this.db = await this.sqliteService.abrirBaseDeDatos(this.nombreBD, false, 'no-encryption', 1, false);
    await this.crearUsuariosDePrueba();
    await this.leerUsuarios();
  }

  async crearUsuariosDePrueba() {
    await this.guardarUsuario(Usuario.getNewUsuario(
      'atorres', 
      'atorres@duocuc.cl', 
      '1234', 
      '¿Cuál es tu animal favorito?', 
      'gato',
      'Ana', 
      'Torres', 
      NivelEducacional.buscarNivelEducacional(6)!,
      new Date(2000, 0, 5)));
    await this.guardarUsuario(Usuario.getNewUsuario(
      'jperez', 
      'jperez@duocuc.cl', 
      '5678', 
      '¿Cuál es tu postre favorito?',
      'panqueques',
      'Juan', 
      'Pérez',
      NivelEducacional.buscarNivelEducacional(5)!,
      new Date(2000, 1, 10)));
    await this.guardarUsuario(Usuario.getNewUsuario(
      'cmujica', 
      'cmujica@duocuc.cl', 
      '0987', 
      '¿Cuál es tu vehículo favorito?',
      'moto',
      'Carla', 
      'Mujica', 
      NivelEducacional.buscarNivelEducacional(6)!,
      new Date(2000, 2, 20)));
  }

  // Create y Update del CRUD. La creación y actualización de un usuario
  // se realizarán con el mismo método, ya que la instrucción "INSERT OR REPLACE"
  // revisa la clave primaria y si el registro es nuevo entonces lo inserta,
  // pero si el registro ya existe, entonces los actualiza. Se debe tener cuidado de
  // no permitir que el usuario cambie su correo, pues dado que es la clave primaria
  // no debe poder ser cambiada.
  
  async guardarUsuario(usuario: Usuario): Promise<void> {
    await this.db.run(this.sqlInsertUpdate, [usuario.cuenta, usuario.correo, usuario.password,
      usuario.preguntaSecreta, usuario.respuestaSecreta, usuario.nombre, usuario.apellido,
      usuario.nivelEducacional.id, usuario.fechaNacimiento?.getTime()]);
    await this.leerUsuarios();
  }

  // Cada vez que se ejecute leerUsuarios() la aplicación va a cargar los usuarios desde la base de datos,
  // y por medio de la instrucción "this.listaUsuarios.next(usuarios);" le va a notificar a todos los programas
  // que se subscribieron a la propiedad "listaUsuarios", que la tabla de usuarios se acaba de cargar. De esta
  // forma los programas subscritos a la variable listaUsuarios van a forzar la actualización de sus páginas HTML.

  // ReadAll del CRUD. Si existen registros entonces convierte los registros en una lista de usuarios
  // con la instrucción ".values as Usuario[];". Si la tabla no tiene registros devuelve null.
  async leerUsuarios(): Promise<void> {
    const usuarios: Usuario[]= (await this.db.query('SELECT * FROM USUARIO;')).values as Usuario[];
    this.listaUsuarios.next(usuarios);
  }

  // Read del CRUD
  async leerUsuario(cuenta: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query(
      'SELECT * FROM USUARIO WHERE cuenta=?;', 
      [cuenta])).values as Usuario[];
    return usuarios[0];
  }

  // Delete del CRUD
  async eliminarUsuarioUsandoCuenta(cuenta: string): Promise<void> {
    await this.db.run('DELETE FROM USUARIO WHERE cuenta=?', 
      [cuenta]);
    await this.leerUsuarios();
  }

  // Validar usuario
  async buscarUsuarioValido(cuenta: string, password: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query(
      'SELECT * FROM USUARIO WHERE cuenta=? AND password=?;',
      [cuenta, password])).values as Usuario[];
    return usuarios[0];
  }

  // Validar usuario
  async buscarUsuarioPorCuenta(cuenta: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query(
      'SELECT * FROM USUARIO WHERE cuenta=?;',
      [cuenta])).values as Usuario[];
    return usuarios[0];
  }

}
