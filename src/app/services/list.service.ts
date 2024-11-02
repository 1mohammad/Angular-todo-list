import { inject, Injectable } from '@angular/core';
import { ListModel } from '@models/list.model';
import { ListHttpService } from './list-http.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditListDialogComponent } from '@components/add-edit-list-dialog/add-edit-list-dialog.component';
import { catchError, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ListService {
	private readonly httpService = inject(ListHttpService);
	private readonly dialog = inject(MatDialog);

	/**
	 * Opens a dialog to add or edit a list and returns an Observable of the updated or new list.
	 * If the user cancels the dialog, it returns an Observable of undefined.
	 *
	 * @param {ListModel | undefined} list The list to edit; if undefined, a new list will be created.
	 * @returns {Observable<ListModel | undefined>} An Observable emitting the updated or newly created list, or undefined if the dialog was cancelled or an error occurred.
	 */
	openAddEditListDialog(list?: ListModel): Observable<ListModel | undefined> {
		const dialogRef = this.dialog.open(AddEditListDialogComponent, {
			width: '40vw',
			data: { title: list?.title, date: list?.date },
		});

		return dialogRef.afterClosed().pipe(
			switchMap(result => {
				if (result && !result.error) {
					if (list) {
						// TODO: Remove workaround after backend issue is fixed. Currently adjusting the result to match expected format.
						return this.httpService.updateList(list._id, result).pipe(
							map(item => ({ ...item, title: result.title })) 
						);
					} else {
						return this.httpService.addList(result);
					}
				}
				return of(undefined);
			}),
			catchError(error => {
				console.error('Error updating or adding the list:', error);
				return of(undefined);
			})
		);
	}
}
