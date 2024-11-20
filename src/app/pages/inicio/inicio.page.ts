import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/interfaces/asistencia';
import { Usuario } from 'src/app/model/usuario';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon, IonLabel } from "@ionic/angular/standalone";
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ForoComponent } from 'src/app/components/foro/foro.component';
import { MiclaseComponent } from 'src/app/components/miclase/miclase.component';
import { CodigoqrComponent } from 'src/app/components/codigoqr/codigoqr.component';
import { AuthService } from 'src/app/services/auth.service';
import { ScannerService } from 'src/app/services/scanner.service';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { Capacitor } from '@capacitor/core';
import { Clase } from 'src/app/model/clase';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CommonModule } from '@angular/common';
import { MisdatosComponent } from 'src/app/components/misdatos/misdatos.component';
import { UsuariosComponent } from 'src/app/components/usuarios/usuarios.component';



@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.page.html',
    styleUrls: ['./inicio.page.scss'],
    standalone: true,
    imports: [IonLabel, IonIcon, IonButton, IonFooter, IonContent, IonTitle, IonToolbar, IonHeader, FooterComponent, HeaderComponent, ForoComponent,MiclaseComponent,
      CodigoqrComponent,WelcomeComponent,CommonModule,MisdatosComponent,UsuariosComponent]
})
export class InicioPage {
sendClickEvent(arg0: string) {
throw new Error('Method not implemented.');
}
    
    @ViewChild(FooterComponent) footer!: FooterComponent;
    selectedComponent = 'welcome';
  
    constructor(private AuthService: AuthService, private scanner: ScannerService) { 
      this.AuthService.selectedComponent.subscribe((selectedComponent) => {
        this.selectedComponent = selectedComponent;
      })
    }
  
    ionViewWillEnter() {
      this.changeComponent('welcome');
    }
  
    async headerClick(button: string) {

      const jsonAsistenciaExample =
        `{    
            "sede": "Alonso Ovalle",
            "idAsignatura": "PGY4121",
            "seccion": "001D",
            "nombreAsignatura": "Aplicaciones Móviles",
            "nombreProfesor": "Cristián Gómez Vega",
            "dia": "2022-08-09",
            "bloqueInicio": 7,
            "horaFin": "15:15",
            "bloqueTermino": 9,
            "horaInicio": "13:00"
        }`;

      if (button === 'testqr') {
        this.showusuarioComponent(jsonAsistenciaExample);
      }
  
      else if (button === 'scan' && Capacitor.getPlatform() === 'web') {
        this.selectedComponent = 'codigoqr';
      }
  
      else if (button === 'scan' && Capacitor.getPlatform() !== 'web') {
          this.showusuarioComponent(await this.scanner.scan());
      }
    }
  
    webQrScanned(qr: string) {
      this.showusuarioComponent(qr);
    }
  
    webQrStopped() {
      this.changeComponent('welcome');
    }
  
    showusuarioComponent(qr: string) {

      if (Clase.isValidclaseQrCode(qr)) {
        this.AuthService.qrCodeData.next(qr);
        this.changeComponent('miclase');
        return;
      }
      
      this.changeComponent('welcome');
    }
  
    footerClick(button: string) {
      this.selectedComponent = button;
    }
  
    changeComponent(name: string) {
      this.selectedComponent = name;
      this.footer.selectedComponent = name;
    }

    async openQrScanner() {
      const result = await BarcodeScanner.startScan();
      if (result !== null && result !== undefined && (result as any).content) {
        this.showusuarioComponent((result as any).content);
      }
      
  
   }

  }

  
