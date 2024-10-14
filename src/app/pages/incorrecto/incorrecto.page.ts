import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incorrecto',
  templateUrl: './incorrecto.page.html',
  styleUrls: ['./incorrecto.page.scss'],
})
export class IncorrectoPage {
  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}