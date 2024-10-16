import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AfterViewInit, Component, ElementRef, ViewChild,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NivelEducacional } from 'src/app/model/nivel-educacional';
import { Usuario } from 'src/app/model/usuario';
import { AnimationController} from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'misdatos.page.html',
  styleUrls: ['misdatos.page.scss'],
  template: '<ion-button [@fadeIn] shape="round" size="small"  (click)="limpiarAnimandoDerIzq()">Limpiar Izq Der</ion-button>',


  
})

export class misdatosPage implements AfterViewInit {
  

  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;
  @ViewChild('page', { read: ElementRef }) page!: ElementRef;
  @ViewChild('itemCuenta', { read: ElementRef }) itemCuenta!: ElementRef;
  @ViewChild('itemNombre', { read: ElementRef }) itemNombre!: ElementRef;
  @ViewChild('itemApellido', { read: ElementRef }) itemApellido!: ElementRef;
  @ViewChild('itemEducacion', { read: ElementRef }) itemEducacion!: ElementRef;
  @ViewChild('itemFechaNacimiento', { read: ElementRef }) itemFechaNacimiento!: ElementRef;
  
  
  public listaNivelesEducacionales = NivelEducacional.getNivelesEducacionales();
  
  public usuario: Usuario;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private animationController: AnimationController) 
  {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute, this.router);
  }

  ngAfterViewInit() {
    this.animarTituloIzqDer();
    this.animarVueltaDePagina();
  }

  limpiarPagina() {
    this.usuario.cuenta = '';
    this.usuario.nombre = '';
    this.usuario.apellido = '';
    this.usuario.nivelEducacional = NivelEducacional.buscarNivelEducacional(1)!;
    this.usuario.fechaNacimiento = undefined;
  }

  limpiarAnimandoDerIzq() {
    this.limpiarPagina();
    this.animarShake(this.itemCuenta.nativeElement, 100);
    this.animarShake(this.itemNombre.nativeElement, 200);
    this.animarShake(this.itemApellido.nativeElement, 300);
    this.animarShake(this.itemEducacion.nativeElement, 400);
    this.animarShake(this.itemFechaNacimiento.nativeElement, 500);
  }

  limpiarAnimandoRotacion() {
    this.limpiarPagina();
    this.animarRotacion(this.itemCuenta.nativeElement, 800);
    this.animarRotacion(this.itemNombre.nativeElement, 1100);
    this.animarRotacion(this.itemApellido.nativeElement, 1400);
    this.animarRotacion(this.itemEducacion.nativeElement, 1700);
    this.animarRotacion(this.itemFechaNacimiento.nativeElement, 2000);
  }

  animarTituloIzqDer() {
    this.animationController
    .create()
    .addElement(this.itemTitulo.nativeElement)
    .iterations(Infinity) // Repite la animación infinitamente
    .duration(5000) // Duración de la animación en milisegundos (2 segundos)
    .fromTo('opacity', 0, 1) // Cambia la opacidad de 0 (invisible) a 1 (visible)
    .play();
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

  animarVueltaDePagina() {
    this.animationController
      .create()
      .addElement(this.page.nativeElement)
      .iterations(1)
      .duration(2500)
      .keyframes([
        { offset: 0, transform: 'translateY(0)', opacity: '1' },  
        { offset: 0.3, transform: 'translateY(-20px)', opacity: '0.5' },  
        { offset: 0.6, transform: 'translateY(0)', opacity: '0' },  
        { offset: 0.7, transform: 'translateY(-10px)', opacity: '0' },  
        { offset: 1, transform: 'translateY(0)', opacity: '1' }  
      ])
      .play();
  }

  

  

  asignado(texto: string) {
    if (texto.trim() !== '') {
      return texto;
    }
    return 'No asignado';
  }

  mostrarDatosPersona() {
    // Si el usuario no ingresa la cuenta, se mostrará un error
    if (this.usuario.cuenta.trim() === '') {
      this.mostrarMensajeAlerta('La cuenta es un campo obligatorio.');
      return;
    }

    // Si el usuario no ingresa al menos el nombre o el apellido, se mostrará un error
    this.usuario.nombre = this.usuario.nombre.trim();
    this.usuario.apellido = this.usuario.apellido.trim();
    if (this.usuario.nombre.trim() === '' && this.usuario.apellido === '') {
      this.mostrarMensajeAlerta('Debe ingresar al menos un nombre o un apellido.');
      return;
    }

    // Mostrar un mensaje emergente con los datos de la persona
    let mensaje = `
      <small>
        <b>Cuenta:      </b> ${this.usuario.cuenta} <br>
        <br>Usuario:    </b> ${this.usuario.correo} <br>
        <br>Nombre:     </b> ${this.asignado(this.usuario.nombre)} <br>
        <br>Apellido:   </b> ${this.asignado(this.usuario.apellido)} <br>
        <br>Educación:  </b> ${this.asignado(this.usuario.nivelEducacional.getEducacion())} <br>
        <br>Nacimiento: </b> ${this.usuario.getFechaNacimiento()}
      </small>
    `;
    this.mostrarMensajeAlerta(mensaje);
  }

  async mostrarMensajeAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Datos personales',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }


actualizarDatos() {
  // Verificamos si los campos están completos
  if (!this.usuario.nombre.trim() || !this.usuario.apellido.trim()) {
    this.mostrarMensajeAlerta('Por favor, completa los campos de Nombre y Apellido.');
    return;
  }

  // Actualizamos localmente los datos del usuario (ejemplo)
  this.mostrarMensajeAlerta('Datos actualizados correctamente.');
  // Aquí podrías agregar la lógica adicional que necesites, como almacenar en LocalStorage
}
}

function actualizarDatos() {
throw new Error('Function not implemented.');
}


