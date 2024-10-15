import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const inicioGuard: CanActivateFn = async (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // El guardián de la página de inicio fuerza la navegación hacia la página
  // de ingreso cuando el usuario quiere entrar al sistema y no se ha autenticado.
  // Este es el caso en que un hacker intenta entrar al sistema sin haber
  // digitado las credenciales correctas.

  if (await authService.isAuthenticated()) {
    // Si el usuario está autenticado lo deja entrar a la página de inicio
    return true;
  } else {
    // Si el usuario no está autenticado lo devuelve a la página de ingreso
    router.navigate(['/ingreso']);
    // Pero le niega la entrada a la página de inicio
    return false;    
  }
}
