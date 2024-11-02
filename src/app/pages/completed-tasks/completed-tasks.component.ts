import { Component, inject, signal } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SloganComponent } from '@components/slogan/slogan.component';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { TaskModel } from '@models/task.model';
import { TaskHttpService } from '@services/task-http.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-completed-tasks',
	standalone: true,
	imports: [
		TaskItemComponent,
		AngularSvgIconModule,
		SloganComponent,
		MatProgressSpinnerModule
	],
	templateUrl: './completed-tasks.component.html',
	styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
	tasksList = signal<TaskModel[]>([]);
	isLoading = true;

	constructor() {
		inject(TaskHttpService).getCompletedTasks()
		.pipe(
			finalize(() => {
				this.isLoading = false;
			})
		)
		.subscribe(
			{
				next: (res) => {
					this.tasksList.set(res || []);
				}
			}
		)
	}

	deleteTask(task: TaskModel): void {
		this.tasksList.update(data => data.filter(item => item._id !== task._id));
	}
}
