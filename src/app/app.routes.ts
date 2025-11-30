import { Routes } from "@angular/router";
import { routeList } from "../common/constants";
import { NavigationLink } from "../modals/NavigationLink";

const populateRoutes = (links: NavigationLink[]): Routes => {

  const routes: Routes = [];
  const defaulLink = links.find(link => link.isDefaultLink);
  if (defaulLink) {
    routes.push({ path: '', redirectTo: defaulLink.route, pathMatch: 'full' });
  }

  links.forEach(link => {
    const childrenRoutes: Routes = [];

    if (link.redirectTo) {
      routes.push({ path: link.route, redirectTo: link.redirectTo, pathMatch: 'full' });
    } else {
      if (link.children && link.children.length > 0) {
        const nestedRoutes = populateRoutes(link.children);
        childrenRoutes.push(...nestedRoutes);
      }

      routes.push({
        path: link.route,
        title: link.displayName,
        loadComponent: link.loadComponent,
        children: childrenRoutes.length > 0 ? childrenRoutes : undefined,
        canActivate: link.canActivate ? [link.canActivate] : undefined,
      });
    }
  });

  return routes;
}

export const routes: Routes = populateRoutes(routeList);
