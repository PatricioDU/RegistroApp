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
  usuarios: Usuario[] = [];
  loading: boolean = true;
  constructor(private databaseService: DataBaseService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }
  

  async cargarUsuarios(): Promise<void> {
    try {
      await this.databaseService.leerUsuarios();
      this.databaseService.listaUsuarios.subscribe((usuarios) => {
        this.usuarios = usuarios;
        this.loading = false;
      });
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      this.loading = false;
    }
  }

  // Eliminar un usuario usando su cuenta
  async eliminarUsuario(cuenta: string): Promise<void> {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await this.databaseService.eliminarUsuarioUsandoCuenta(cuenta);
        alert('Usuario eliminado con éxito');
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        alert('Hubo un error al intentar eliminar el usuario.');
      }
    }
  }

}
