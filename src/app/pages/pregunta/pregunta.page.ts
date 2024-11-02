import { DataBaseService } from 'src/app/services/data-base.service';
import { ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageComponent } from 'src/app/components/language/language.component';


@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
  standalone: true,
  imports: [
      CommonModule            // CGV-Permite usar directivas comunes de Angular
    , FormsModule             // CGV-Permite usar formularios
    , IonicModule             // CGV-Permite usar componentes de Ionic como IonContent, IonItem, etc.
    , TranslateModule         // CGV-Permite usar pipe 'translate'
    , LanguageComponent       // CGV-Lista de idiomas
  ]
})
export class PreguntaPage implements OnInit {

  usuario: any;


  constructor(private router: Router
    , private DataBaseService: DataBaseService
  ) 
  { 
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.usuario = navigation.extras.state ['usuario'];
    }
  }

  navegarRespuesta() {
    this.DataBaseService.buscarUsuarioPorPregunta(this.usuario.preguntaSecreta).then(usuario => {
      if (usuario && usuario.respuestaSecreta === this.usuario.respuestaSecreta) {
        const navigationExtras: NavigationExtras = {
          state: { usuario: usuario } // Pasamos el usuario en el estado de navegación
        };
        this.router.navigate(['/correcto'], navigationExtras);
      } else {
        this.router.navigate(['/incorrecto']);
      }
    });
  }

  Ingreso() {
    this.router.navigate(['/ingreso']);
  }
  

  ngOnInit() {}
}

