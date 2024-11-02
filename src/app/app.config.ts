import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { errorHandlerInterceptor } from './http-inteceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
	provideZoneChangeDetection({ eventCoalescing: true }), 
	provideRouter(routes, withComponentInputBinding()),
	provideHttpClient(
		withInterceptors([errorHandlerInterceptor])
	),
	provideAnimationsAsync(),
	provideAngularSvgIcon()
  ]
};
