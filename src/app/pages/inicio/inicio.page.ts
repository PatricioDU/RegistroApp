import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { Usuario } from 'src/app/model/usuario';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage {

  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  // public usuario: Usuario;
  // public asistencia: Asistencia = new Asistencia();
  // public escaneando = false;
  // public datosQR: string = '';
  // animationController: any;
  

  // constructor(private activatedRoute: ActivatedRoute, private router: Router) { 
  //   this.usuario = new Usuario();
  //   this.usuario.recibirUsuario(activatedRoute, router);
  // }

  // ngOnInit() {
  // }
  // navegar(pagina: string) {
  //   this.usuario.navegarEnviandousuario(this.router, pagina);
  // }



}
