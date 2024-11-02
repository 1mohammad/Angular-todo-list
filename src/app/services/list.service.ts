import { inject, Injectable } from '@angular/core';
import { ListModel } from '@models/list.model';
import { ListHttpService } from './list-http.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEditListDialogComponent } from '@components/add-edit-list-dialog/add-edit-list-dialog.component';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ListService {
	private readonly httpService = inject(ListHttpService);
	private readonly dialog = inject(MatDialog);

	openAddEditListDialog(list?: ListModel): Observable<ListModel | undefined> {
		const dialogRef = this.dialog.open(AddEditListDialogComponent, {
			width: '40vw',
			data: { title: list?.title, date: list?.date },
		});

		return dialogRef.afterClosed().pipe(
			switchMap(result => {
				if (result !== undefined && !result.error) {
					if (list) {
						return this.httpService.updateList(list._id, result)
							// TODO: DELETE this part and just return result after backend issue is fixed. Currently, the result is wrong and returning old data.
							.pipe(
								map(item => ({ ...item, title: result.title }))
							);
					} else {
						return this.httpService.addList(result);
					}
				}
				return of(undefined);
			})
		);
	}
}
