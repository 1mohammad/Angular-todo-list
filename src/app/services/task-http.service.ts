import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { ListModel } from '@models/list.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  constructor(private http: HttpClient) { }

  getMainTasks(): Observable<ListModel> {
	return this.http.get<ListModel>(`${environment.baseApi}mainList`);
  }

  getTasksById(id:string): Observable<any> {
	return this.http.get<ListModel>(`${environment.baseApi}tasks/query/${id}`);
  }
}
