import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TaskListComponent } from '@components/task-list/task-list.component';
import { ListHttpService } from '@services/list-http.service';

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
	mainList = toSignal(inject(ListHttpService).getMainList());
}
