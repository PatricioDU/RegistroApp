import { Usuario } from './../../model/usuario';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [TranslateModule,CommonModule]
})
export class WelcomeComponent  {

  usuario = new Usuario();

  constructor(private auth: AuthService) { 
    this.auth.usuarioAutenticado.subscribe((usuario) => {
      console.log(usuario);
      if (usuario) {
        this.usuario = usuario;
      }
    });
  }

  

}
