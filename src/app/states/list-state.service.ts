import { Injectable, signal } from '@angular/core';
import { ListModel } from '@models/list.model';

@Injectable({
	providedIn: 'root'
})
export class ListStateService {
	public lists = signal<ListModel[]>([]);

	public setInitialList(lists: ListModel[]): void {
		this.lists.set(lists);
	}

	public addList(list: ListModel):void {
		this.lists.update((lists) => ([...lists, list]));
	}

	public updateList(updatedList: ListModel):void {
		this.lists.update(lists => lists.map(list => list._id === updatedList._id ? updatedList : list));
	}

	public deleteList(id: string):void {
		this.lists.update(lists => lists.filter(list => list._id !== id));
	}
}