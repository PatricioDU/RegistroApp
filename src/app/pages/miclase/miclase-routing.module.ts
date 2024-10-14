import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { miclasePage } from './miclase.page';

const routes: Routes = [
  {
    path: '',
    component: miclasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class miclasePageRoutingModule {}
