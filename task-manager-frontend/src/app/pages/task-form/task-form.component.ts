import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Router, ActivatedRoute } from '@angular/router'; // 👈 Import ActivatedRoute

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  taskData = {
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'pending',
    dueDate: ''
  };

  taskId: string | null = null; // Store the ID if we are editing
  isEditing: boolean = false;
  errorMessage: string = '';

  constructor(
    private taskService: TaskService, 
    private router: Router,
    private route: ActivatedRoute // 👈 Inject Route
  ) {}

  ngOnInit(): void {
    // Check if there is an ID in the URL (e.g., /tasks/edit/123)
    this.taskId = this.route.snapshot.paramMap.get('id');
    
    if (this.taskId) {
      this.isEditing = true;
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    this.taskService.getTask(id).subscribe({
      next: (response) => {
        // Fill the form with existing data
        this.taskData = response.data;
        
        // Format date for the input field (YYYY-MM-DD)
        if (this.taskData.dueDate) {
            this.taskData.dueDate = new Date(this.taskData.dueDate).toISOString().split('T')[0];
        }
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Could not load task details.';
      }
    });
  }

  onSubmit() {
    if (this.isEditing && this.taskId) {
      // UPDATE Mode
      this.taskService.updateTask(this.taskId, this.taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => this.errorMessage = 'Failed to update task.'
      });
    } else {
      // CREATE Mode
      this.taskService.createTask(this.taskData).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => this.errorMessage = 'Failed to create task.'
      });
    }
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}