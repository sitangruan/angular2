export const linkedInUrl = 'https://www.linkedin.com/in/sitang-ruan/';
export const sourceCodesUrl = 'https://github.com/sitangruan/angular2';
export const sitangImagePath = '/images/sitangCircle.png';

import type { SortingInfo } from "../modals/SortingInfo";
import type { NavigationLink } from "../modals/NavigationLink";

export const routeList = [
  {
    id: 1,
    displayName: "Todos",
    route: "/todos",
    isDefaultLink: false,
  },
  {
    id: 2,
    displayName: "Posts",
    route: "/posts",
    isDefaultLink: false,
  },
  {
    id: 3,
    displayName: "Users",
    route: "/users",
    isDefaultLink: true,
    children: [
      {
        id: 5,
        displayName: "Post-List",
        route: "",
        parentRoute: "posts",
        isDefaultLink: false,
        hasNestedLink: false,
      } as NavigationLink,
      {
        id: 6,
        displayName: "Post-Details",
        route: ":id",
        parentRoute: "posts",
        isDefaultLink: false,
        hasNestedLink: false,
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
    route: "/photos",
    isDefaultLink: false,
  },
] as NavigationLink[];

export const defaultUsersSortingInfo: SortingInfo = {
  sortBy: 'name',
  sortOrder: 'asc',
};
