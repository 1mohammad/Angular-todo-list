import { Component, computed, effect, EventEmitter, inject, input, Input, Output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { TaskModel } from '@models/task.model';
import { DatePipe } from '@angular/common';
import { TaskService } from '@services/task.service';
import { ListModel } from '@models/list.model';
import { TaskHttpService } from '@services/task-http.service';
import { MoreOptionsComponent } from '@components/more-options/more-options.component';
import { Options } from '@models/more-options.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ListStateService } from '@states/list-state.service';

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
	private readonly snackBar = inject(MatSnackBar);
	private readonly listState = inject(ListStateService);

	@Output() itemDeleted = new EventEmitter<void>();
	@Output() doneChanged = new EventEmitter<TaskModel>();

	private _data = signal<TaskModel | undefined>(undefined);
	data = input.required<TaskModel>();
	listData = input<ListModel>()

	dataToShow = computed(() => this._data() || this.data())
	isInMainList = computed<boolean>(() => this.listData()?._id === this.listState.mainList()?._id)


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
	];

	constructor() {
		this.addMoveToMainListOption();
	}

	private addMoveToMainListOption():void {
		const moveToMainOption:Options = {
			icon: 'home',
			title: 'Move to home',
			callback: () => this.moveToMainList()
		}
		effect(() => {
			if (!this.isInMainList()) {
				this.cardOptions.splice(1,0,moveToMainOption);
			}
		})
	}

	editTask(): void {
		this.taskService.openAddEditTaskDialog(this.listData()?._id, this.dataToShow()).subscribe({
			next: (res) => {
				if (!res) return;
				this._data.set(res);
			}
		})
	}

	private moveToMainList():void {
		if (this.isInMainList()) return;
		this.taskHttpService.updateTask(this.data()._id, {list: this.listState.mainList()?._id}).subscribe({
			next: () => {
				this.snackBar.open('Moved to Today\'s Tasks', 'Ok', {
					duration: 3000
				})
				this.itemDeleted.emit();
			}
		})
	}

	deleteTask(): void {
		this.taskHttpService.deleteTask(this.data()._id).subscribe({
			next: () => {
				this.itemDeleted.emit();
				this.snackBar.open(`"${this.dataToShow().title}" deleted`, 'Close', {
					duration: 3000
				})
			}
		})
	}

	toggleDone(checkbox: MatCheckboxChange): void {
		this.taskHttpService.updateTask(
			this.data()._id, { done: checkbox.checked })
			.subscribe({
				next: () => {
					this.data().done = checkbox.checked;
					this.doneChanged.emit(this.data())
				}
			})
	}
}
