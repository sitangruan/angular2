import { Routes } from "@angular/router";
import { routeList } from "../common/constants";

export const routes: Routes = routeList.map(route => ({
  path: route.route,
  title: route.displayName,
  loadComponent: route.loadComponent,
}));
