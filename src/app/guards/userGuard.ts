import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export const userGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {

  const router = inject(Router); // Use inject to get the Router instance

  var id = route.params['id'];
  if (!Number.isInteger(Number(route.params['id'])) || !(route.params['id'] > 0)) {
    alert("Invalid user ID. Please enter a valid integer greater than 0.");
    return router.createUrlTree(['']);
  }

  return true;
};
