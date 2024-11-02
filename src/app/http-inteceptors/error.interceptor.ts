import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:HttpHandlerFn) => {

	const snackBar = Inject(MatSnackBar);

	return next(req).pipe(
		catchError((error: HttpErrorResponse) => {
			let errorMessage = 'An error occurred';
			if (error.error instanceof ErrorEvent) {
				errorMessage = `Error: ${error.error.message}`;
			} else {
				errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
			}
			
			snackBar.open(errorMessage, 'Close', {
				duration: 3000,
			});

			return throwError(() => error);
		})
	);
}