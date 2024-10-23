import { Component, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonButton, IonIcon } from "@ionic/angular/standalone";
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-codigoqr',
  templateUrl: './codigoqr.component.html',
  styleUrls: ['./codigoqr.component.scss'],standalone: true,
  imports: [IonIcon, IonButton, IonFooter, IonContent, IonTitle, IonToolbar, IonHeader, FooterComponent, HeaderComponent]
})
export class CodigoqrComponent {
  @Input() data: string = ''; 
}
