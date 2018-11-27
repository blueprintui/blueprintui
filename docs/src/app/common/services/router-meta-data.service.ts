import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, RouterStateSnapshot, NavigationEnd, ActivatedRouteSnapshot } from '@angular/router';
import { tap, map, filter } from 'rxjs/operators';
import { of, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterMetaDataService {
  constructor(
    private readonly title: Title,
    private readonly router: Router
  ) { }

  init() {
    return getMergedRouteData(this.router).pipe(
      tap((routeData: any) => this.setPageTitle(routeData))
    );
  }

  private setPageTitle(routeData: any) {
    console.log(routeData.title);
    if (routeData.title) {
      this.title.setTitle(routeData.title);
    }
  }
}

export function getMergedRouteData(router: Router) {
  const currentRoute = of(router.routerState.snapshot);
  const futureRoutes = router.events.pipe(filter(event => event instanceof NavigationEnd), map(() => router.routerState.snapshot));
  return merge(currentRoute, futureRoutes).pipe(map(snapshot => getMergedRouteDataSnapshot(snapshot)));
}

export function getMergedRouteDataSnapshot(snapshot: ActivatedRouteSnapshot | RouterStateSnapshot) {
  let data: { [key: string]: any } = {};
  let route = snapshot.root;
  do {
    data = { ...data, ...route.data };
    route = route.firstChild;
  } while (route);

  return data;
}
