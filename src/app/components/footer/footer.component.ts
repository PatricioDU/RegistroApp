import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth.service';
import { logOutOutline } from 'ionicons/icons';
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
  ]
})
export class FooterComponent {

  constructor(private router: Router,private navctrl: NavController,private authservice: AuthService) {
    addIcons({ logOutOutline }); }

  navegar(page: string) {
    this.router.navigate([page]);
    
  }

  logout() {
    this.authservice.logout();
  }

  }



