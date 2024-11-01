import { Component, DestroyRef, inject, Input, signal, Signal, SimpleChanges } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { TaskListComponent } from '@components/task-list/task-list.component';
import { ListModel } from '@models/list.model';
import { ListHttpService } from '@services/list-http.service';

@Component({
  selector: 'app-my-list',
  standalone: true,
  imports: [
	TaskListComponent
  ],
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss'
})
export class MyListComponent {
	private readonly destroyRef = inject(DestroyRef);
	private readonly httpService = inject(ListHttpService);
	listData = signal<ListModel | undefined>(undefined);
	@Input() id?:string;
	
	ngOnChanges(changes: SimpleChanges): void {
		if (changes['id'] && changes['id'].currentValue !== changes['id'].previousValue) {
			const listId = changes['id'].currentValue;
			this.httpService.getListById(listId)
			.pipe(takeUntilDestroyed(this.destroyRef))
			.subscribe({
				next: (result) => {
					this.listData.set(result);
				}
			})
		}
	}
}
