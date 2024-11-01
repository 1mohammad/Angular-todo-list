import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ListModel } from '@models/list.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListHttpService {

  constructor(private http: HttpClient) { }

  getAllLists(): Observable<ListModel[]> {
	return this.http.get<ListModel[]>(`${environment.baseApi}lists`)
	.pipe(
		map(res => (res.filter(item => !item.isMain)))
	);
  }

  updateList(id:string,title:string, date:Date): Observable<ListModel> {
	const list = {
		title,
		date,
		isMain: false
	};
	return this.http.put<ListModel>(`${environment.baseApi}lists/${id}`, list)
  }

  addList(title:string, date:Date): Observable<ListModel> {
	const list = {
		title,
		date,
		isMain: false
	};
	return this.http.post<ListModel>(`${environment.baseApi}lists`, list)
  }

  deleteList(id:string) {
	return this.http.delete(`${environment.baseApi}lists/${id}`)
  }


}
