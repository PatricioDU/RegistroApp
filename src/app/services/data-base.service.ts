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
        fechaNacimiento TEXT NOT NULL,
        direccion TEXT NOT NULL
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
      fechaNacimiento,
      direccion
    ) VALUES (?,?,?,?,?,?,?,?,?,?);
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
      '1234', 
      '¿Cuál es tu animal favorito?', 
      'gato',
      'Ana', 
      'Torres', 
      NivelEducacional.buscarNivelEducacional(6)!,
      new Date(2000, 0, 5),
      'la florida'));
    await this.guardarUsuario(Usuario.getNewUsuario(
      'jperez', 
      'jperez@duocuc.cl', 
      '5678',
      '5678', 
      '¿Cuál es tu postre favorito?',
      'panqueques',
      'Juan', 
      'Pérez',
      NivelEducacional.buscarNivelEducacional(5)!,
      new Date(2000, 1, 10),
      'estacion central'));
    await this.guardarUsuario(Usuario.getNewUsuario(
      'cmujica', 
      'cmujica@duocuc.cl', 
      '0987',
      '0987', 
      '¿Cuál es tu vehículo favorito?',
      'moto',
      'Carla', 
      'Mujica', 
      NivelEducacional.buscarNivelEducacional(6)!,
      new Date(2000, 2, 20),
      'maipu'));
      await this.guardarUsuario(Usuario.getNewUsuario(
      'admin', 
      'admin@admin.cl', 
      'admin',
      'admin',
      '¿Cuál es tu fruta favorita?',
      'manzana',
      'Administrador', 
      '',
      NivelEducacional.buscarNivelEducacional(5)!,
      new Date(2000, 3, 15),
      ''));
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
      usuario.nivelEducacional.id, this.formatDateToDDMMYYYY(usuario.fechaNacimiento),usuario.direccion]);
    await this.leerUsuarios();
  }

  // Cada vez que se ejecute leerUsuarios() la aplicación va a cargar los usuarios desde la base de datos,
  // y por medio de la instrucción "this.listaUsuarios.next(usuarios);" le va a notificar a todos los programas
  // que se subscribieron a la propiedad "listaUsuarios", que la tabla de usuarios se acaba de cargar. De esta
  // forma los programas subscritos a la variable listaUsuarios van a forzar la actualización de sus páginas HTML.

  // ReadAll del CRUD. Si existen registros entonces convierte los registros en una lista de usuarios
  // con la instrucción ".values as Usuario[];". Si la tabla no tiene registros devuelve null.
  async leerUsuarios(): Promise<void> {
    
    const rows: any = (await this.db.query('SELECT * FROM USUARIO;')).values;
  
    const usuarios: Usuario[] = [];
    rows.forEach((row: any) => {
      const usu = new Usuario();
      usu.cuenta = row['cuenta'];
      usu.correo = row['correo'];
      usu.password = row['password'];
      usu.confirmarPassword = row['confirmarpassword'];
      usu.preguntaSecreta = row['preguntaSecreta'];
      usu.respuestaSecreta = row['respuestaSecreta'];
      usu.nombre = row['nombre'];
      usu.apellido = row['apellido'];
      usu.nivelEducacional = NivelEducacional.buscarNivelEducacional(row['nivelEducacional'])!; // Asegúrate de que el valor en la BD es compatible con el tipo `NivelEducacional`
      usu.fechaNacimiento = this.stringToDate(row['fechaNacimiento'])!; // Verificamos si existe y convertimos a Date
      usu.direccion = row['direccion'];
  
      usuarios.push(usu); // Agregamos el objeto Usuario a la lista
    });
  
    this.listaUsuarios.next(usuarios); // Actualizamos la lista de usuarios
  }
  

  // Read del CRUD
  async leerUsuario(cuenta: string): Promise<Usuario | undefined> {

    const rows: any = (await this.db.query(
      'SELECT * FROM USUARIO WHERE cuenta=?;', 
      [cuenta])).values as Usuario[];

    const usuarios: Usuario[] = [];
      rows.forEach((row: any) => {
        const usu = new Usuario();
        usu.cuenta = row['cuenta'];
        usu.correo = row['correo'];
        usu.password = row['password'];
        usu.confirmarPassword = row['confirmarpassword'];
        usu.preguntaSecreta = row['preguntaSecreta'];
        usu.respuestaSecreta = row['respuestaSecreta'];
        usu.nombre = row['nombre'];
        usu.apellido = row['apellido'];
        usu.nivelEducacional = NivelEducacional.buscarNivelEducacional(row['nivelEducacional'])!; // Asegúrate de que el valor en la BD es compatible con el tipo `NivelEducacional`
        usu.fechaNacimiento = this.stringToDate(row['fechaNacimiento'])!; // Verificamos si existe y convertimos a Date
        usu.direccion = row['direccion'];
    
        usuarios.push(usu); // Agregamos el objeto Usuario a la lista
      });
      alert(usuarios[0].cuenta)
      alert(usuarios[0].fechaNacimiento)
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

  // validar por correo
  async buscarUsuarioPorCorreo(correo: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[]= (await this.db.query(
      'SELECT * FROM USUARIO WHERE correo=?;',
      [correo])).values as Usuario[];
    return usuarios[0];
  }

  // validar respuesta
  async buscarUsuarioPorPregunta(pregunta: string): Promise<Usuario | undefined> {
    const usuarios: Usuario[] = (await this.db.query(
      'SELECT * FROM USUARIO WHERE preguntaSecreta=?;',
      [pregunta]
    )).values as Usuario[];
  
    return usuarios[0];
  }
  
  

  formatDateToDDMMYYYY(date: Date | undefined): string {
    if (date) {
      const day = String(date.getDate()).padStart(2, '0'); // Obtiene el día y lo convierte en 2 dígitos
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (los meses empiezan en 0) y lo convierte en 2 dígitos
      const year = date.getFullYear(); // Obtiene el año
    
      return `${day}/${month}/${year}`; // Formato dd/mm/yyyy
    } else {
      return '01/01/2000';
    }
  }

  stringToDate(dateString: string): Date | null {
    const [day, month, year] = dateString.split('/').map(Number); // Separamos por '/' y convertimos a número
  
    // Validamos si el formato es correcto
    if (!day || !month || !year || day > 31 || month > 12 || year < 1000) {
      return null; // Devuelve null si el formato es inválido
    }
  
    // Restamos 1 al mes porque en JavaScript los meses están basados en 0 (enero = 0, diciembre = 11)
    return new Date(year, month - 1, day);
  }

  
}