import { AuthService } from './../../services/auth.service';
import { Usuario } from 'src/app/model/usuario';
import { CommonModule } from "@angular/common";
import { Component,OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from '@ionic/angular';
import { DataBaseService } from 'src/app/services/data-base.service';



@Component({
  selector: 'app-home',
  templateUrl: 'misdatos.page.html',
  styleUrls: ['misdatos.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,FormsModule],
})

export class misdatosPage implements OnInit {

  usuario = new Usuario();
  repeticionPassword = '';


  constructor(private authService: AuthService, private bd: DataBaseService) { }

  ngOnInit() { 
    this.authService.usuarioAutenticado.subscribe((usuario)) => {
      this.usuario = usuario? suario : new Usuario();
    }
  }
      
  
}