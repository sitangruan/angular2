export const linkedInUrl = 'https://www.linkedin.com/in/sitang-ruan/';
export const sourceCodesUrl = 'https://github.com/sitangruan/angular2';
export const sitangImagePath = '/images/sitangCircle.png';

import type { SortingInfo } from "../modals/SortingInfo";
import type { NavigationLink } from "../modals/NavigationLink";

export const routeList = [
  {
    id: 1,
    displayName: "Todos",
    route: "todos",
    isDefaultLink: false,
    loadComponent: () => import('../app/todos/todos').then(m => m.Todos),
  },
  {
    id: 2,
    displayName: "Posts",
    route: "posts",
    isDefaultLink: false,
    loadComponent: () => import('../app/posts/posts').then(m => m.Posts),
  },
  {
    id: 3,
    displayName: "Users",
    route: "users",
    isDefaultLink: true,
    loadComponent: () => import('../app/users/users').then(m => m.Users),
    children: [
      {
        id: 5,
        displayName: "User list",
        route: "",
        parentRoute: "users",
        isDefaultLink: false,
        loadComponent: () => import('../app/users/user-list/user-list').then(m => m.UserList),
      } as NavigationLink,
      {
        id: 6,
        displayName: "User details",
        route: ":id",
        parentRoute: "users",
        isDefaultLink: false,
        loadComponent: () => import('../app/users/user-detail/user-detail').then(m => m.UserDetail),
        canActivate: (to: { params: { id: number } }) => {
          if (!Number.isInteger(Number(to.params?.id)) || !(to.params?.id > 0)) {
            alert("Invalid user ID. Please enter a valid integer greater than 0.");
            return false;
          }

          // If the id is a valid integer, allow navigation
          return true; // Allow navigation
        }
      } as NavigationLink,
    ],
  },
  {
    id: 4,
    displayName: "Photos",
    route: "photos",
    isDefaultLink: false,
    loadComponent: () => import('../app/photos/photos').then(m => m.Photos),
  },
] as NavigationLink[];

export const defaultUsersSortingInfo: SortingInfo = {
  sortBy: 'name',
  sortOrder: 'asc',
};
