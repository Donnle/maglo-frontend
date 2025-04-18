import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class RouteTitleService {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  get activeRouterTitle() {
    return this.titleService.getTitle();
  }

  get activeRouterTitle$(): Observable<string | undefined> {
    return this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((): string | undefined => this.titleService.getTitle())
    );
  }
}
