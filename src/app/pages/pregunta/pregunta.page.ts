import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {
  
  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private ToastController: ToastController,
    private router: Router) 
  { 

    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngOnInit() {
  }
  ingresar() {
    debugger
    // Llama a la función que valida la respuesta secreta
    const error = this.usuario.validarRespuestaSecreta();
    
    // Si hay un error, muestra el mensaje emergente y redirige al usuario a la página de "incorrecto"
    if(error) {
      this.mostrarMensajeEmergente(error);
      this.usuario.navegarEnviandousuario(this.router, '/incorrecto');
      return;
    }
    
    // Si la respuesta es correcta, muestra el mensaje con la contraseña y redirige a "correcto"
    this.mostrarMensajeEmergente(this.usuario.password);
    this.usuario.navegarEnviandousuario(this.router, '/correcto');
  }
  
  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.ToastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }
}
