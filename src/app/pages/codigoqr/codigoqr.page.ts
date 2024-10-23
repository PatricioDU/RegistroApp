 import { Component, OnInit } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { FormsModule } from '@angular/forms';
 import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';

 @Component({
   selector: 'app-codigoqr',
   templateUrl: './codigoqr.page.html',
   styleUrls: ['./codigoqr.page.scss'],
   standalone: true,
   imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
 })
 export class CodigoqrPage implements OnInit {

   constructor() { }

   ngOnInit() {
   }

 }
