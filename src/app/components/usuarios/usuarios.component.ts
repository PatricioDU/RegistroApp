import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { Usuario } from 'src/app/model/usuario';
import { NivelEducacional } from 'src/app/model/nivel-educacional'; 
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';
import { showAlertDUOC, showToast } from 'src/app/tools/message-routines';
import { AnimationController} from '@ionic/angular';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonLabel } from "@ionic/angular/standalone";
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  standalone: true,
  imports: [
    IonicModule, 
    CommonModule, 
    FormsModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    IonHeader, 
    IonTitle,
  ],
})

export class UsuariosComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
