import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { homeOutline, logOutOutline, pawOutline, pencilOutline, qrCodeOutline } from 'ionicons/icons';
import { ForoComponent } from '../foro/foro.component';
import { MiclaseComponent } from '../miclase/miclase.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [
      CommonModule    // CGV-Permite usar direcdsatetivas comunes de Angular
    , FormsModule     // CGV-Permite usar formularios
    , IonicModule     // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule // CGV-Permite usar pipe 'translate'
    , ForoComponent   // CGV-Permite usar el componente foroComponent
    , MiclaseComponent// CGV-Permite usar el componente MiclaseComponent
  ]
})
export class FooterComponent {

  selectedComponent = 'welcome';

  constructor(private router: Router,private authservice: AuthService) {
    addIcons({ logOutOutline,homeOutline, qrCodeOutline, pawOutline, pencilOutline }); }

    segmentChanged(selectedComponent: string) {
      this.selectedComponent = selectedComponent;
      this.authservice.selectedComponent.next(this.selectedComponent);
    }

  navegar(page: string) {
    this.router.navigate([page]);
    
  }

  logout() {
    this.authservice.logout();
  }

  }



