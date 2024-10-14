import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
})
export class CorreoPage implements OnInit {

  public usuario: Usuario;

  constructor(
      private router: Router
    , private activatedRoute: ActivatedRoute
    , private toastController: ToastController) 
  {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }
  ingresar() {
    const error = this.usuario.Correo();

    if(error) {
      this.mostrarMensajeEmergente(error);
      this.usuario.navegarEnviandousuario(this.router, '/incorrecto');
      return;
    } 

    const encontrado = Usuario.buscarCorreoValido(this.usuario.correo);
    this.usuario.cuenta = encontrado!.cuenta;
    this.usuario.password = encontrado!.password;
    this.usuario.navegarEnviandousuario(this.router, '/pregunta');
  }

  async mostrarMensajeEmergente(mensaje: string, duracion?: number) {
    const toast = await this.toastController.create({
        message: mensaje,
        duration: duracion? duracion: 2000
      });
    toast.present();
  }

}
