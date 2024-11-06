import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonCard } from '@ionic/angular/standalone';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/model/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-miclase',
  templateUrl: './miclase.component.html',
  styleUrls: ['./miclase.component.scss'],
  standalone: true,
  imports: [IonCard, IonContent, IonGrid, IonRow, IonCol, CommonModule, FormsModule]
})
export class MiclaseComponent  implements OnDestroy {
  
  miclase: any;
  private subscription: Subscription;

  constructor(private authService: AuthService) { 
    this.subscription = this.authService.qrCodeData.subscribe((qr: any) => {
      this.miclase = qr? JSON.parse(qr): null;
    })
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
