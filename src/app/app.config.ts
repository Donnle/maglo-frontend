import {
  ApplicationConfig,
  importProvidersFrom,
  provideExperimentalZonelessChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../environments/environment';
import { AuthState } from './core/state/auth.state';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './core/interceptors/error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor])
    ),
    provideAnimations(),
    importProvidersFrom(
      NgxsModule.forRoot([AuthState], {
        developmentMode: !environment.production
      }),
      NgxsLoggerPluginModule.forRoot({
        disabled: environment.production
      }),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: environment.production
      }),
      ToastrModule.forRoot({
        timeOut: 5000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        closeButton: true,
        enableHtml: false,
        tapToDismiss: true,
        newestOnTop: true,
        maxOpened: 5
      })
    )
  ]
};
