import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskItemComponent } from '@components/task-item/task-item.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
	MatButtonModule,
	MatIconModule,
	TaskItemComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {

}
