import { Component, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterModule } from '@angular/router';
import { ROUTES } from '@enums/routes.enum';
import { ListModel } from '@models/list.model';
import { ListHttpService } from '@services/list-http.service';
import { ListService } from '@services/list.service';

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
	MatMenuModule,
	RouterModule
  ],
  templateUrl: './my-lists-nav.component.html',
  styleUrl: './my-lists-nav.component.scss'
})
export class MyListsNavComponent implements OnInit {
	readonly dialog = inject(MatDialog);
	readonly httpService = inject(ListHttpService);
	readonly listService = inject(ListService);
	readonly router = inject(Router);
	readonly routesEnum = ROUTES;
	myLists = signal<ListModel[]>([]);

	@Output() itemClicked = new EventEmitter<void>()

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
	
	addList(): void {
		this.listService.openAddEditDialog().subscribe({
			next: (res) => {
				if (res) {
					this.myLists.update(list => ([...list, res]));
					this.router.navigate(['/'+ROUTES.MY_LIST,res._id]);
				}
			}
		})
	}
	
}
