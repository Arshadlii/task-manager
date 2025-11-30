import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  // ⚠️ Ensure this matches your backend URL. 
  // If you changed it to plural '/api/tasks', update it here too.
  private apiUrl = 'https://task-manager-3pkj.onrender.com/api/tasks'; 

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Helper to get headers with the token
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // 1. Get All Tasks
  getTasks(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.getHeaders() });
  }

  // 2. Create Task
  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, { headers: this.getHeaders() });
  }

  // 3. Delete Task
  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  
  // Add this method to your TaskService class
  getTask(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
  // 4. Update Task (We will use this later)
  updateTask(id: string, task: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, task, { headers: this.getHeaders() });
  }
}