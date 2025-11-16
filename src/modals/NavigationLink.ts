export type NavigationLink = {
 id: number,
 displayName: string,
 route: string,
 isDefaultLink: boolean,
 parentRoute?: string,
 children?: NavigationLink[],
 canActivate?: (to: { params: { id: number } }) => boolean | void,
 loadComponent: () => Promise<any>,
}
