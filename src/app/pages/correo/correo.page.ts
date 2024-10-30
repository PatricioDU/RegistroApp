import { DataBaseService } from 'src/app/services/data-base.service';
import { Usuario } from './../../model/usuario';
import { Component, ViewChild } from '@angular/core';
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
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.page.html',
  styleUrls: ['./correo.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent       // CGV-Lista de idiomas
  ]
})
export class CorreoPage {

  correo = "atorres@duocuc.cl";

  constructor( 
    private dataBaseService : DataBaseService,
  private router: Router,) 
  {
  }

navegarPregunta() {
  this.dataBaseService.buscarUsuarioPorCorreo(this.correo).then(usuario => {
    if (usuario) {
      const navigationExtras: NavigationExtras = {
        state: { usuario: usuario } // Pasamos el usuario en el estado de navegación
      };
      this.router.navigate(['/pregunta'], navigationExtras);
    } else {
      this.router.navigate(['/incorrecto']);
    }
  });
}


}
