import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { ListModel } from '@models/list.model';
import { ListHttpService } from '@services/list-http.service';
import { ListService } from '@services/list.service';
import { TaskHttpService } from '@services/task-http.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
	MatButtonModule,
	MatIconModule,
	TaskItemComponent,
	MatMenuModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
	private readonly taskHttpService = inject(TaskHttpService);
	private readonly listHttpService = inject(ListHttpService);
	private readonly listService = inject(ListService);
	private readonly router = inject(Router);

	@Input({required: true}) data: ListModel | undefined;

	listData?: ListModel;

	ngOnChanges(changes: SimpleChanges): void {
		if (!changes['data'] || !changes['data'].currentValue || changes['data'].previousValue?._id === changes['data'].currentValue._id) {
		  return;
		}
	  
		const newData = changes['data'].currentValue;
		this.listData = newData;
		const newId = newData?._id;
	  
		if (newId) {
		  this.taskHttpService.getTasksById(newId).subscribe({
			next: (res) => {
			  console.log(res);
			}
		  });
		}
	  }

	deleteList() {
		if(!this.listData) return;
		this.listHttpService.deleteList(this.listData?._id).subscribe({
			next: () => {
				this.router.navigate(['/']);
			}
		})
	}

	editList() {
		if (!this.listData) return;
		this.listService.openAddEditDialog(this.listData).subscribe({
			next: (result) => {
				this.listData = result;
			}
		})
	}

	
}
