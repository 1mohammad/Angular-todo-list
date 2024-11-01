import { inject, Injectable } from '@angular/core';
import { ListModel } from '@models/list.model';
import { ListHttpService } from './list-http.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditListDialogComponent } from '@components/add-edit-list-dialog/add-edit-list-dialog.component';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ListService {
	private readonly httpService = inject(ListHttpService);
	private readonly dialog = inject(MatDialog);
	constructor() { }

	openAddEditDialog(list?: ListModel): Observable<ListModel | undefined> {
		const dialogRef = this.dialog.open(AddEditListDialogComponent, {
			data: { title: list?.title, date: list?.date },
		});

		return dialogRef.afterClosed().pipe(
			switchMap(result => {
				if (result !== undefined && !result.error) {
					if (list) {
						return this.httpService.updateList(list._id, result.title, result.date);
					} else {
						return this.httpService.addList(result.title, result.date);
					}
				}
				return of(undefined);
			})
		);
	}
}
