import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { TaskModel } from '@models/task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '@services/task.service';
import { ListModel } from '@models/list.model';
import { TaskHttpService } from '@services/task-http.service';
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { Options } from '@models/more-options.model';

@Component({
	selector: 'app-task-item',
	standalone: true,
	imports: [
		MatCardModule,
		MatCheckboxModule,
		DatePipe,
		MoreOptionsComponent
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
	@Output() doneChanged = new EventEmitter<TaskModel>();

	cardOptions: Options[] = [
		{
			title: "Edit",
			icon: "edit",
			callback: () => this.editTask()
		},
		{
			title: "Delete",
			icon: "delete_outline",
			callback: () => this.deleteTask()
		}
	]

	editTask(): void {
		this.taskService.openAddEditTaskDialog(this.listData?._id, this.data).subscribe({
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
					this.doneChanged.emit(this.data)
				}
			})
	}
}
