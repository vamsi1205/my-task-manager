import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  getTasksByDate(date?: string): Observable<any[]> {
    const url = date ? `${this.apiUrl}?date=${date}` : this.apiUrl;
    return this.http.get<any[]>(url);
  }

  createTask(taskData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskData);
  }

  updateTask(id: string, taskData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, taskData);
  }

  markTaskCompleted(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/complete`, {});
  }

  resetTask(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}/reset`, {});
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
