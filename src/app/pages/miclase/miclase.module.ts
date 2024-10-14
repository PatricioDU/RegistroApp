import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { miclasePageRoutingModule } from './miclase-routing.module';

import { miclasePage } from './miclase.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    miclasePageRoutingModule
  ],
  declarations: [miclasePage]
})
export class miclasePageModule {}


