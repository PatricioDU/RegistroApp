import { AuthService } from './../../services/auth.service';
import { Usuario } from 'src/app/model/usuario';
import { CommonModule } from "@angular/common";
import { Component,OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { AnimationController} from '@ionic/angular';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem,IonInput,IonLabel,  } from "@ionic/angular/standalone";
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.component.html',
  styleUrls: ['./misdatos.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    IonHeader, 
    IonTitle
  ],

})
export class MisdatosComponent  implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';


  constructor(private authService: AuthService, private bd: DataBaseService, private animationController: AnimationController) { }

  ngOnInit() { 
    this.authService.usuarioAutenticado.subscribe((usuario) => {
      this.usuario = usuario? usuario : new Usuario();
      this.repeticionPassword = usuario? usuario.password: '';
    });
  }


  animarShake(nativeElement: any, duration: number) {
    this.animationController
    .create()
    .addElement(nativeElement)
    .iterations(1) 
    .duration(duration)
    .keyframes([
      { offset: 0, transform: 'translateX(0)' },
      { offset: 0.1, transform: 'translateX(-10px)' },
      { offset: 0.2, transform: 'translateX(10px)' },
      { offset: 0.3, transform: 'translateX(-10px)' },
      { offset: 0.4, transform: 'translateX(10px)' },
      { offset: 0.5, transform: 'translateX(-10px)' },
      { offset: 0.6, transform: 'translateX(10px)' },
      { offset: 0.7, transform: 'translateX(-10px)' },
      { offset: 0.8, transform: 'translateX(10px)' },
      { offset: 0.9, transform: 'translateX(-10px)' },
      { offset: 1, transform: 'translateX(0)' }
    ])
    .play();
}

animarRotacion(elementRef: any, duration: number) {
  this.animationController
    .create()
    .addElement(elementRef)
    .iterations(1)
    .duration(duration)
    .fromTo('transform', 'rotate(0deg)', 'rotate(360deg)')
    .play();
}
  
  validarCampo(nombreCampo:string, valor: string) {
    if (valor.trim() === '') {
      showAlertDUOC('debe ingresar un valor para el campo "${nombreCampo}".');
      return false;
    }
    return true;
  }

  async actualizarperfil(){
    if (!this.validarCampo('nombre',this.usuario.nombre)) return;
    if (!this.validarCampo('apellidos',this.usuario.apellido)) return;
    if (!this.validarCampo('correo',this.usuario.correo)) return;
    if (!this.validarCampo('pregunta secreta',this.usuario.preguntaSecreta)) return;
    if (!this.validarCampo('respuesta secreta',this.usuario.respuestaSecreta)) return;
    if (!this.validarCampo('contraseña',this.usuario.password)) return;
    if (!this.validarCampo('direccion',this.usuario.direccion)) return;
    if (this.usuario.password !== this.repeticionPassword) {
      showAlertDUOC('las contraseñas escritas deben ser iguales.');
      return;
    }
    await this.bd.guardarUsuario(this.usuario);
    this.authService.guardarUsuarioAutenticado(this.usuario);
    showToast('sus datos fueron actualizados');
  }



}
