import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: any[] = [];
  errorMessage: string = '';

  constructor(private taskService: TaskService, private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe({
      next: (response: any) => {
        // Your backend returns { result: 5, data: [...] }
        this.tasks = response.data; 
      },
      error: (err) => {
        console.error('Error fetching tasks', err);
        this.errorMessage = 'Could not load tasks. Please try logging in again.';
      }
    });
  }

  deleteTask(id: string) {
    if(confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => {
          // Remove the deleted task from the list without reloading the page
          this.tasks = this.tasks.filter(t => t.id !== id);
        },
        error: (err) => console.error('Error deleting task', err)
      });
    }
  }
  
  // We will build this page in the next step
  goToCreate() {
    this.router.navigate(['/tasks/new']);
  }
}