import { Component, computed, effect, inject, input, Input, signal, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
import { finalize } from 'rxjs';

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
		SloganComponent,
		MatProgressSpinnerModule
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

	data = input.required<ListModel | undefined>();

	isCompletedTasks = input(false);
	showSlogan = input(false);

	listData?: ListModel;
	tasksList = signal<TaskModel[]>([]);
	isLoading = false;

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
	];

	constructor() {
		effect(() => {
			if (this.data()) {
				const newData = this.data();
				this.listData = newData;
				const newId = newData?._id;

				if (newId) {
					this.isLoading = true;
					this.taskHttpService.getTasksById(newId)
						.pipe(
							finalize(() => {
								this.isLoading = false;
							})
						)
						.subscribe({
							next: (res) => {
								this.tasksList.set(res);
							}
						});
				}
			}

		})
	}


	/**
	 * Deletes the current list and navigates to the home page upon successful deletion.
	 * Assumes `listData` is an object that contains the `_id` of the list to be deleted.
	 * If `listData` is undefined or does not contain a valid `_id`, the function will exit early.
	 */
	deleteList(): void {
		if (!this.listData?._id) return;
		this.listHttpService.deleteList(this.listData._id).subscribe({
			next: (res) => {
				this.listStateService.deleteList(res._id)
				this.router.navigate(['/']);
			}
		})
	}

	/**
	 * Initiates the editing of an existing list by opening a dialog.
	 * Updates the local state and the current list data with the result from the dialog.
	 * Assumes `listData` contains the list to be edited. If `listData` is undefined,
	 * the method will exit early, preventing the dialog from opening.
	 */
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

	/**
	 * Initiates the process to create a new task associated with the current list.
	 * Opens a dialog for entering the task details and adds the new task to the
	 * tasks list upon successful creation. If `listData` is undefined, indicating
	 * that no list is currently selected, the method will exit early to prevent
	 * the dialog from opening.
	 */
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

	/**
	 * Toggles the completion status of a given task.
	 * Iterates through the list of tasks, updating the 'done' status of the task
	 *
	 * @param {TaskModel} task The task object whose 'done' status needs to be toggled.
	 */
	changeTaskDone(task: TaskModel): void {
		this.tasksList.update(tasks => tasks.map(t => t._id === task._id ? { ...t, done: task.done } : t));
	}

}
