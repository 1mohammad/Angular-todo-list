import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { TaskHttpService } from './task-http.service';
import { TaskModel } from '@models/task.model';
import { AddEditTaskDialogComponent } from '@components/add-edit-task-dialog/add-edit-task-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private readonly httpService = inject(TaskHttpService);
	private readonly dialog = inject(MatDialog);

	openAddEditTaskDialog(listId?:string,task?: TaskModel): Observable<TaskModel | undefined> {
		const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
			data: {title: task?.title, description: task?.description, date: task?.date },
		});

		return dialogRef.afterClosed().pipe(
			switchMap(result => {
				if (result !== undefined && !result.error) {
					if (task && task._id) {
						return this.httpService.updateTask(task._id, result);
					} else {
						let newTask: TaskModel;
						if (listId) {
							newTask = {
								...result,
								list: listId
							}
						} else {
							newTask = {...result}
						}
						
						return this.httpService.addTask(newTask);
					}
				}
				return of(undefined);
			})
		);
	}
}
