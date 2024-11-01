import { Component } from '@angular/core';
import { TaskListComponent } from '@components/task-list/task-list.component';

@Component({
  selector: 'app-today-tasks',
  standalone: true,
  imports: [
	TaskListComponent
  ],
  templateUrl: './today-tasks.component.html',
  styleUrl: './today-tasks.component.scss'
})
export class TodayTasksComponent {

}
