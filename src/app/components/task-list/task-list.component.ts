import { Component, Input, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskItemComponent } from '@components/task-item/task-item.component';
import { ListModel } from '@models/list.model';
import { TaskHttpService } from '@services/task-http.service';

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
	@Input({required: true}) data: ListModel | undefined;

	constructor(
		private httpService: TaskHttpService
	) {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['data']) {
			const {_id} = changes['data'].currentValue;
			this.httpService.getTasksById(_id).subscribe({
				next: (res) => {
					console.log(res);
				}
			})
		}
	}

	getTasksById():void {

	}
}
