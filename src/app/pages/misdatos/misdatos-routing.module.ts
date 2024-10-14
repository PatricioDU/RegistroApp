import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { misdatosPage } from './misdatos.page';

const routes: Routes = [
  {
    path: '',
    component: misdatosPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class misdatosPageRoutingModule {}
