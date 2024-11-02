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

  getMainList(): Observable<ListModel> {
	return this.http.get<ListModel>(`${environment.baseApi}mainList`);
  }

  getMyLists(): Observable<ListModel[]> {
	return this.http.get<ListModel[]>(`${environment.baseApi}lists`)
	.pipe(
		map(res => (res.filter(item => !item.isMain)))
	);
  }

  getListById(id:string): Observable<ListModel> {
	return this.http.get<ListModel>(`${environment.baseApi}lists/${id}`)
  }

  updateList(id:string,list:ListModel): Observable<ListModel> {
	return this.http.put<ListModel>(`${environment.baseApi}lists/${id}`, list)
  }

  addList(list: ListModel): Observable<ListModel> {
	return this.http.post<ListModel>(`${environment.baseApi}lists`, list)
  }

  deleteList(id:string): Observable<ListModel> {
	return this.http.delete<ListModel>(`${environment.baseApi}lists/${id}`)
  }


}
