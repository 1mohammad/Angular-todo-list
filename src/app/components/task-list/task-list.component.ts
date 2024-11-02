import { Component, computed, inject, input, Input, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { SloganComponent } from '@components/slogan/slogan.component';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { ListModel } from '@models/list.model';
import { Options } from '@models/more-options.model';
import { TaskModel } from '@models/task.model';
import { ListHttpService } from '@services/list-http.service';
import { ListService } from '@services/list.service';
import { TaskHttpService } from '@services/task-http.service';
import { TaskService } from '@services/task.service';
import { ListStateService } from '@states/list-state.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
	selector: 'app-task-list',
	standalone: true,
	imports: [
		MatButtonModule,
		MatIconModule,
		TaskItemComponent,
		MatMenuModule,
		AngularSvgIconModule,
		MoreOptionsComponent,
		SloganComponent
	],
	templateUrl: './task-list.component.html',
	styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
	private readonly taskHttpService = inject(TaskHttpService);
	private readonly listHttpService = inject(ListHttpService);
	private readonly listService = inject(ListService);
	private readonly taskService = inject(TaskService);
	private readonly router = inject(Router);
	private readonly listStateService = inject(ListStateService);

	@Input({ required: true }) data: ListModel | undefined;
	isCompletedTasks = input(false);
	showSlogan = input(false);

	listData?: ListModel;
	tasksList = signal<TaskModel[]>([]);

	sortedTasks = computed(() => {
		return this.tasksList().sort((a, b) => {
			return (a.done === b.done) ? 0 : a.done ? 1 : -1;
		});
	});

	moreOptions: Options[] = [
		{
			title: "Edit",
			icon: "edit",
			callback: () => this.editList()
		},
		{
			title: "Delete",
			icon: "delete_outline",
			callback: () => this.deleteList()
		}
	]

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
					this.tasksList.set(res);
				}
			});
		}
	}

	deleteList(): void {
		if (!this.listData?._id) return;
		this.listHttpService.deleteList(this.listData._id).subscribe({
			next: (res) => {
				this.listStateService.deleteList(res._id)
				this.router.navigate(['/']);
			}
		})
	}

	editList(): void {
		if (!this.listData) return;
		this.listService.openAddEditListDialog(this.listData).subscribe({
			next: (result) => {
				if (!result) return;
				this.listStateService.updateList(result);
				this.listData = result;
			}
		})
	}

	newTask(): void {
		if (!this.listData) return;
		this.taskService.openAddEditTaskDialog(this.listData._id).subscribe({
			next: (res) => {
				if (!res) return;
				this.tasksList.update(list => ([...list, res]))
			}
		})
	}

	deleteTask(task: TaskModel): void {
		this.tasksList.update(data => data.filter(item => item._id !== task._id));
	}

	changeTaskDone(task: TaskModel): void {
		this.tasksList.update(tasks => {
			const updatedTasks = tasks.map(t => {
				if (t._id === task._id) {
					return { ...t, done: task.done };
				}
				return t;
			});
			return updatedTasks;
		});
	}

}
