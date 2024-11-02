import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable, of, switchMap } from 'rxjs';
import { TaskHttpService } from './task-http.service';
import { TaskModel } from '@models/task.model';
import { AddEditTaskDialogComponent } from '@components/add-edit-task-dialog/add-edit-task-dialog.component';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	private readonly httpService = inject(TaskHttpService);
	private readonly dialog = inject(MatDialog);

	openAddEditTaskDialog(listId?: string, task?: TaskModel): Observable<TaskModel | undefined> {
		const dialogRef = this.dialog.open(AddEditTaskDialogComponent, {
			width: '40vw',
			data: { title: task?.title, description: task?.description, date: task?.date },
		});

		return dialogRef.afterClosed().pipe(
			switchMap(result => {
				if (result !== undefined && !result.error) {
					if (task && task._id) {
						return this.httpService.updateTask(task._id, result)
							// TODO: DELETE this part and just return result after backend issue is fixed. Currently, the result is wrong and returning old data.
							.pipe(
								map(item => ({ ...item, title: result.title, description: result.description, date: result.date }))
							);
					} else {
						let newTask: TaskModel;
						if (listId) {
							newTask = {
								...result,
								list: listId
							}
						} else {
							newTask = { ...result }
						}

						return this.httpService.addTask(newTask);
					}
				}
				return of(undefined);
			})
		);
	}
}
