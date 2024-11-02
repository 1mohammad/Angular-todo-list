import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { TaskModel } from '@models/task.model';
import { TaskHttpService } from '@services/task-http.service';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [
	TaskItemComponent
  ],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
	tasksList = signal<TaskModel[]>([])
	
	constructor() {
		inject(TaskHttpService).getCompletedTasks().subscribe(
			{
				next: (res) => {
					this.tasksList.set(res || []);
				}
			}
		)
	}
	
	deleteTask(task: TaskModel):void {
		this.tasksList.update(data => data.filter(item => item._id !== task._id));
	}
}
