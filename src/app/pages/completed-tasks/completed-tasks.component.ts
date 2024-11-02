import { Component } from '@angular/core';
import { TaskListComponent } from '@components/task-list/task-list.component';
import { ListModel } from '@models/list.model';

@Component({
  selector: 'app-completed-tasks',
  standalone: true,
  imports: [
	TaskListComponent
  ],
  templateUrl: './completed-tasks.component.html',
  styleUrl: './completed-tasks.component.scss'
})
export class CompletedTasksComponent {
	listInfo: ListModel = {
		title: 'Completed Missions',
		_id: '',
		date: new Date,
		isMain: false
	}
}
