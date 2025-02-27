import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ListModel } from '@models/list.model';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ListHttpService {
	private readonly http = inject(HttpClient);

	getMainList(): Observable<ListModel> {
		return this.http.get<ListModel>(`${environment.baseApi}mainList`);
	}

	getAllLists(): Observable<ListModel[]> {
		return this.http.get<ListModel[]>(`${environment.baseApi}lists`);
	}

	getListById(id: string): Observable<ListModel> {
		return this.http.get<ListModel>(`${environment.baseApi}lists/${id}`)
	}

	updateList(id: string, list: ListModel): Observable<ListModel> {
		return this.http.put<ListModel>(`${environment.baseApi}lists/${id}`, list)
	}

	addList(list: ListModel): Observable<ListModel> {
		return this.http.post<ListModel>(`${environment.baseApi}lists`, list)
	}

	deleteList(id: string): Observable<ListModel> {
		return this.http.delete<ListModel>(`${environment.baseApi}lists/${id}`)
	}


}
