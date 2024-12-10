import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Theme } from '../../core/enums/themes.enum';
import { Observable, Subscriber } from 'rxjs';
import { LocalStorageKey } from '../enums/local-storage.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly DARK_MATCH_MEDIA_KEY: string = `(prefers-color-scheme: ${Theme.Dark})`;
  private readonly LOCAL_STORAGE_KEY: string = LocalStorageKey.Theme;
  private readonly renderer: Renderer2;

  private get currentTheme(): Theme | null {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) as Theme;
  }

  private set currentTheme(theme: Theme) {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, theme);
    this.currentThemeUI = theme;
  }

  private set currentThemeUI(theme: Theme) {
    const htmlElement = this.renderer.selectRootElement('html', true);
    this.renderer.setAttribute(htmlElement, 'data-theme', theme);
  }

  private get systemTheme(): Theme | null {
    if (!window.matchMedia) {
      return null;
    }

    const isDark: boolean = window.matchMedia(
      this.DARK_MATCH_MEDIA_KEY
    ).matches;

    return isDark ? Theme.Dark : Theme.Light;
  }

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  initTheme(): void {
    this.currentThemeUI = this.currentTheme || this.systemTheme || Theme.Light;

    this.systemThemeChanges().subscribe({
      next: (theme: Theme): Theme => (this.currentTheme = theme)
    });
  }

  private systemThemeChanges(): Observable<Theme> {
    return new Observable((observer: Subscriber<Theme>) => {
      const EVENT_NAME: 'change' = 'change';

      const callback = (event: MediaQueryListEvent) => {
        observer.next(event.matches ? Theme.Dark : Theme.Light);
      };

      if (window.matchMedia == null) {
        observer.error('Error while getting Match Media!');
        observer.complete();
        return;
      }

      window
        .matchMedia(this.DARK_MATCH_MEDIA_KEY)
        .addEventListener(EVENT_NAME, callback);

      return () => {
        window
          .matchMedia(this.DARK_MATCH_MEDIA_KEY)
          .removeEventListener(EVENT_NAME, callback);
      };
    });
  }
}
