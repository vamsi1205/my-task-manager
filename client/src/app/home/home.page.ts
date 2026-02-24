import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as confettiModule from 'canvas-confetti';
const confetti = (confettiModule as any).default || confettiModule;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  selectedDate: string = new Date().toISOString().split('T')[0];
  tasks: any[] = [];
  progress = 0;
  userName = '';
  canEdit = true;

  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
  ) {
    this.userName = this.authService.getUser()?.name || '';
  }

  ngOnInit() {
    this.loadTasks();
  }

  ionViewWillEnter() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasksByDate(this.selectedDate).subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.calculateProgress();
        this.checkCanEdit();
      },
      error: (err) => {
        console.error('Error loading tasks', err);
      },
    });
  }

  onDateChange() {
    this.loadTasks();
  }

  checkCanEdit() {
    const today = new Date().toISOString().split('T')[0];
    this.canEdit = this.selectedDate >= today;
  }

  calculateProgress() {
    if (this.tasks.length === 0) {
      this.progress = 0;
      return;
    }
    const completedTasks = this.tasks.filter((t) => t.isCompleted).length;
    this.progress = completedTasks / this.tasks.length;
  }

  markCompleted(task: any) {
    if (!this.canEdit) {
      this.presentToast(
        'You can only complete tasks for today or future dates.',
      );
      return;
    }

    this.taskService.markTaskCompleted(task._id).subscribe({
      next: (updatedTask) => {
        task.isCompleted = true;
        this.calculateProgress();
        this.showSuccessMessage();

        if (this.progress === 1) {
          this.triggerConfetti();
        }
      },
      error: (err) => {
        console.error('Error marking task completed', err);
        this.presentToast('Failed to mark task completed.');
      },
    });
  }

  onTaskCheckboxChange(task: any, event: any) {
    if (!this.canEdit) {
      this.presentToast('You can only update tasks for today or future dates.');
      return;
    }

    const isChecked = event?.detail?.checked;

    if (isChecked) {
      this.markCompleted(task);
      return;
    }

    this.taskService.resetTask(task._id).subscribe({
      next: () => {
        task.isCompleted = false;
        this.calculateProgress();
        this.presentToast('Task has been reset.');
      },
      error: (err) => {
        console.error('Error resetting task', err);
        this.presentToast('Failed to reset task.');
      },
    });
  }

  async showSuccessMessage() {
    const remaining = this.tasks.filter((t) => !t.isCompleted).length;
    let message = '';
    if (remaining > 0) {
      message = `Great work! ${remaining} more tasks to go`;
    } else {
      message = `All tasks completed! Amazing!`;
    }

    this.presentToast(message);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  triggerConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  addTask() {
    this.router.navigate(['/manage-tasks'], {
      queryParams: { date: this.selectedDate },
    });
  }

  editTask(task: any) {
    if (this.canEdit) {
      this.router.navigate(['/manage-tasks'], {
        queryParams: {
          id: task._id,
          title: task.title,
          description: task.description,
          date: task.taskDate,
        },
      });
    }
  }
}
