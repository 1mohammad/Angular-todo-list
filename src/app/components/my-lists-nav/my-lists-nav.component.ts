import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AddEditListDialogComponent } from '@components/add-edit-list-dialog/add-edit-list-dialog.component';
import { ListModel } from '@models/list.model';
import { ListHttpService } from '@services/list-http.service';

@Component({
  selector: 'app-my-lists-nav',
  standalone: true,
  imports: [
	MatDividerModule,
	MatListModule,
	MatIconModule,
	MatFormFieldModule,
	MatInputModule,
	FormsModule,
	MatMenuModule
  ],
  templateUrl: './my-lists-nav.component.html',
  styleUrl: './my-lists-nav.component.scss'
})
export class MyListsNavComponent implements OnInit {
	readonly dialog = inject(MatDialog);
	readonly httpService = inject(ListHttpService);
	myLists = signal<ListModel[]>([]);

	ngOnInit(): void {
		this.getMyLists();
	}

	getMyLists():void {
		this.httpService.getAllLists().subscribe({
			next: (res: ListModel[]) => {
				this.myLists.set(res);
			}
		})
	}
	
	openDialog(list?:ListModel): void {
		const dialogRef = this.dialog.open(AddEditListDialogComponent, {
		  data: {title: list?.title,date: list?.date},
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  if (result !== undefined && !result.error) {
			let serverRequest$;
			if (list) {
				serverRequest$ = this.httpService.updateList(list._id,result.title,result.date);
			} else {
				serverRequest$ = this.httpService.addList(result.title,result.date)
			}
			serverRequest$.subscribe({
				next: (res) => {
					this.myLists.update(list => ([...list, res]))
				}
			})
		  }
		});
	}
	
}
