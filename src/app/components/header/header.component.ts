import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { arrowBackOutline, logOut, logOutOutline, qrCodeOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { AnimationController} from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar directivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
  ]
})
export class HeaderComponent {
  @ViewChild('titulo', { read: ElementRef }) itemTitulo!: ElementRef;

  @Output() headerClick = new EventEmitter<string>();

  constructor(private navCtrl: NavController, private authService: AuthService,private animationController: AnimationController) { 
    addIcons({ logOutOutline, qrCodeOutline });
  }

  sendClickEvent(buttonName: string) {
    this.headerClick.emit(buttonName);
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


}
