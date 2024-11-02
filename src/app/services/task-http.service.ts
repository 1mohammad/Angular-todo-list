import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { TaskModel } from '@models/task.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TaskHttpService {

	private readonly http = inject(HttpClient);

	getTasksById(id: string): Observable<TaskModel[]> {
		return this.http.get<TaskModel[]>(`${environment.baseApi}tasks/query/${id}`);
	}

	updateTask(id: string, data: Partial<TaskModel>): Observable<TaskModel> {
		return this.http.put<TaskModel>(`${environment.baseApi}tasks/${id}`, data)
	}

	addTask(data: TaskModel): Observable<TaskModel> {
		return this.http.post<TaskModel>(`${environment.baseApi}tasks`, data)
	}

	deleteTask(id: string): Observable<TaskModel> {
		return this.http.delete<TaskModel>(`${environment.baseApi}tasks/${id}`)
	}

	getCompletedTasks(): Observable<TaskModel[]> {
		return this.http.get<TaskModel[]>(`${environment.baseApi}compeleted`);
	}

}
