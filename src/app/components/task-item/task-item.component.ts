import { Component, EventEmitter, inject, Input, model, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { TaskModel } from '@models/task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '@services/task.service';
import { ListModel } from '@models/list.model';
import { TaskHttpService } from '@services/task-http.service';

@Component({
	selector: 'app-task-item',
	standalone: true,
	imports: [
		MatCardModule,
		MatButtonModule,
		MatIconModule,
		MatCheckboxModule,
		MatMenuModule,
		DatePipe
	],
	templateUrl: './task-item.component.html',
	styleUrl: './task-item.component.scss'
})
export class TaskItemComponent {
	private readonly taskService = inject(TaskService);
	private readonly taskHttpService = inject(TaskHttpService);

	@Input({ required: true }) data!: TaskModel;
	@Input() listData?: ListModel;

	@Output() itemDeleted = new EventEmitter<void>();
	@Output() doneChanged = new EventEmitter<void>();

	editTask(): void {
		this.taskService.openAddEditDialog(this.listData?._id, this.data).subscribe({
			next: (res) => {
				if (!res) return;
				this.data = res;
			}
		})
	}

	deleteTask(): void {
		this.taskHttpService.deleteTask(this.data._id).subscribe({
			next: () => {
				this.itemDeleted.emit();
			}
		})
	}

	toggleDone(checkbox: MatCheckboxChange): void {
		this.taskHttpService.updateTask(
			this.data._id, { done: checkbox.checked })
			.subscribe({
				next: () => {
					this.data.done = checkbox.checked;
					this.doneChanged.emit()
				}
			})
	}
}
