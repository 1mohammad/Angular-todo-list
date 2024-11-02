import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { TaskHttpService } from './task-http.service';
import { TaskModel } from '@models/task.model';
import { AddEditTaskDialogComponent } from '@components/add-edit-task-dialog/add-edit-task-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private readonly httpService = inject(TaskHttpService);
	private readonly dialog = inject(MatDialog);

	/**
	 * Opens a dialog to add or edit a task, returning an Observable of the updated or newly created task.
	 * If the dialog is cancelled or an error occurs, it returns an Observable of undefined.
	 *
	 * @param {string | undefined} listId The ID of the list to which the task belongs; required if adding a new task.
	 * @param {TaskModel | undefined} task The task to be edited; if undefined, a new task will be created.
	 * @returns {Observable<TaskModel | undefined>} An Observable emitting the updated or newly created task, or undefined if the dialog was cancelled or an error occurred.
	 */
	openAddEditTaskDialog(listId?: string, task?: TaskModel): Observable<TaskModel | undefined> {
		const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
			width: '40vw',
			data: { title: task?.title, description: task?.description, date: task?.date },
		});

		return dialogRef.afterClosed().pipe(
			switchMap(result => {
				if (result && !result.error) {
					if (task && task._id) {
						// TODO: Remove workaround after backend issue is fixed. Adjusting result to match expected format.
						return this.httpService.updateTask(task._id, result).pipe(
							map(item => ({ ...item, ...result }))
						);
					} else {
						const newTask: TaskModel = { ...result, ...(listId && { list: listId }) };
						return this.httpService.addTask(newTask);
					}
				}
				return of(undefined);
			}),
			catchError(error => {
				console.error('Error updating or adding the task:', error);
				return of(undefined);
			})
		);
	}
}
