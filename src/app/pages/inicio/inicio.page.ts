import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// import { ViewWillEnter } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';
import { Router } from '@angular/router';
// import { colorWandOutline } from 'ionicons/icons';
// import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service'
import { LoadingController } from '@ionic/angular';
import jsQR, { QRCode } from 'jsqr';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent       // CGV-Lista de idiomas
  ]
})
export class InicioPage {

  
  @ViewChild('video') private video!: ElementRef;
  @ViewChild('canvas') private canvas!: ElementRef;
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  public escaneando = false;
  public datosQR : string = '';
  public loading : HTMLIonLoadingElement | null = null;

  public bloqueInicio: number = 0;
  public bloqueTermino: number =0;
  public dia: string = '';
  public horaFin: string = '';
  public horaInicio: string = '';
  public idAsignatura: string = '';
  public nombreAsignatura: string = '';
  public nombreProfesor: string = '';
  public seccion: string = '';
  public sede: string = '';
  usuario: any;

  constructor(
    private loadingController: LoadingController,
    private router : Router) { }

  public obtenerDatosQr(source?: CanvasImageSource): boolean {
    let w = 0;
    let h = 0;
    if (!source) {
      this.canvas.nativeElement.width = this.video.nativeElement.videoWidth;
      this.canvas.nativeElement.height = this.video.nativeElement.videoHeight;
    }
    w = this.canvas.nativeElement.width;
    h = this.canvas.nativeElement.height;

    const context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    context.drawImage(source ? source : this.video.nativeElement, 0, 0, w, h);
    const img: ImageData = context.getImageData(0, 0, w, h);
    const qrCode = jsQR(img.data, img.width, img.height, { inversionAttempts: 'dontInvert' });
    if (qrCode) {
      this.escaneando = false;
      this.datosQR = qrCode.data;
      this.mostrarDatosQROrdenados(this.datosQR);
      this.irAMiClase();
    }

    return this.datosQR !== '';
  }

  public mostrarDatosQROrdenados(datosQR: string): void {
    const objetoDatosQR = JSON.parse(datosQR);
    this.bloqueInicio = objetoDatosQR.bloqueInicio;
    this.bloqueTermino = objetoDatosQR.bloqueTermino;
    this.dia = objetoDatosQR.dia;
    this.horaFin = objetoDatosQR.horaFin;
    this.horaInicio = objetoDatosQR.horaInicio;
    this.idAsignatura = objetoDatosQR.idAsignatura;
    this.nombreAsignatura = objetoDatosQR.nombreAsignatura;
    this.nombreProfesor = objetoDatosQR.nombreProfesor;
    this.seccion = objetoDatosQR.seccion;
    this.sede = objetoDatosQR.sede;
  }

  public irAMiClase(): void {
    this.router.navigate(['/tabs/mi-clase'], {
      queryParams: {
        bloqueInicio: this.bloqueInicio,
        bloqueTermino: this.bloqueTermino,
        dia: this.dia,
        horaFin: this.horaFin,
        horaInicio: this.horaInicio,
        idAsignatura: this.idAsignatura,
        nombreAsignatura: this.nombreAsignatura,
        nombreProfesor: this.nombreProfesor,
        seccion: this.seccion,
        sede: this.sede
      }
    });
  }

  public verificarArchivoConQr(event: Event): void {
    const input = event.target as HTMLInputElement;  // Asegura que el target es un input
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];  // Accede al primer archivo
      const img = new Image();
      img.onload = () => {
        this.obtenerDatosQr(img);
      };
      img.src = URL.createObjectURL(file);  // Carga la imagen
    }
  }

  public async comenzarEscaneoQR(){
    try {
      const mediaProvider: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      this.video.nativeElement.srcObject = mediaProvider;
      this.video.nativeElement.setAttribute('playsinline', 'true');
      this.loading = await this.loadingController.create({
        message: 'Iniciando escaneo...'
      });
      await this.loading.present();
      this.video.nativeElement.play();
      this.escaneando = true; // Actualiza el estado a escaneando
      requestAnimationFrame(this.verificarVideo.bind(this));
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      // Manejar el error adecuadamente
    }
  }
  async verificarVideo(){
    if (this.video.nativeElement.readyState === this.video.nativeElement.HAVE_ENOUGH_DATA){
      if (this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.escaneando =true;
      }
      if(this.obtenerDatosQr()){
        console.log('datos obtenidos');
      } else {
        if(this.escaneando){
          console.log('escaneando...');
          requestAnimationFrame(this.verificarVideo.bind(this));
        }
      }
    } else {console.log('video aún no tiene datos');
       requestAnimationFrame(this.verificarVideo.bind(this));
    }
  }
  
  public detenerEscaneoQR(): void {
    this.escaneando = false; // Actualiza el estado a no escaneando
    // Detén el video y libera la cámara
    const stream = this.video.nativeElement.srcObject;
    if (stream) {
      stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    }
    this.video.nativeElement.srcObject = null;
  }
 
  navegar(pagina: string) {
    this.usuario.navegarEnviandousuario(this.router, pagina);
  }


}
