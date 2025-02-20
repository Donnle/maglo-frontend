import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteTitleService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get activeRouterTitle() {
    let route: ActivatedRoute = this.activatedRoute;

    while (route.firstChild) {
      route = route.firstChild;
    }

    return route.snapshot.data['title'];
  }

  get activeRouterTitle$(): Observable<string | undefined> {
    return this.router.events.pipe(
      filter((event): boolean => event instanceof NavigationEnd),
      map((): ActivatedRoute => this.activatedRoute),
      map((route: ActivatedRoute): string | undefined => {
        while (route.firstChild) {
          route = route.firstChild;
        }

        return route.snapshot.data['title'];
      })
    );
  }
}
