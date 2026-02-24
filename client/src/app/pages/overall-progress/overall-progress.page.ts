import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-overall-progress',
  templateUrl: './overall-progress.page.html',
  styleUrls: ['./overall-progress.page.scss'],
  standalone: false
})
export class OverallProgressPage implements OnInit {
  allTasks: any[] = [];
  dailyStats: any[] = [];
  overallPercentage = 0;
  loading = false;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadStats();
  }

  ionViewWillEnter() {
    this.loadStats();
  }

  loadStats() {
    this.loading = true;
    this.taskService.getTasksByDate().subscribe({
      next: (tasks) => {
        this.allTasks = tasks;
        this.calculateStats();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading stats', err);
        this.loading = false;
      }
    });
  }

  calculateStats() {
    if (this.allTasks.length === 0) {
      this.overallPercentage = 0;
      this.dailyStats = [];
      return;
    }

    const completedCount = this.allTasks.filter(t => t.isCompleted).length;
    this.overallPercentage = (completedCount / this.allTasks.length) * 100;

    // Group by date
    const groups = this.allTasks.reduce((acc, task) => {
      const date = task.taskDate;
      if (!acc[date]) {
        acc[date] = { date, total: 0, completed: 0 };
      }
      acc[date].total++;
      if (task.isCompleted) {
        acc[date].completed++;
      }
      return acc;
    }, {});

    this.dailyStats = Object.values(groups).map((stat: any) => ({
      ...stat,
      percentage: (stat.completed / stat.total) * 100
    })).sort((a: any, b: any) => b.date.localeCompare(a.date));
  }
}
