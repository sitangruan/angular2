import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable } from "rxjs"

export type NavigationLink = {
 id: number,
 displayName: string,
 route: string,
 redirectTo?: string,
 isDefaultLink: boolean,
 parentRoute?: string,
 children?: NavigationLink[],
 canActivate?: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree,
 loadComponent: () => Promise<any>,
}
