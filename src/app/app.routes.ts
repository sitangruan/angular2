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
    routes.push({
      path: link.route,
      title: link.displayName,
      loadComponent: link.loadComponent,
    });
  });

  return routes;
}

export const routes: Routes = populateRoutes(routeList);
