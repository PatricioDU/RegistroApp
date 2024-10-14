import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/usuario';

@Component({
  selector: 'app-correcto',
  templateUrl: './correcto.page.html',
  styleUrls: ['./correcto.page.scss'],
})
export class CorrectoPage implements OnInit {

  public usuario: Usuario;
  public correo: string ='';
 
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.usuario = new Usuario();
    this.usuario.recibirUsuario(this.activatedRoute,this.router);
  }

  ngOnInit() {
  }

  navegar(pagina:string){
    this.usuario.navegarEnviandoUsuario(this.router,pagina);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }



}