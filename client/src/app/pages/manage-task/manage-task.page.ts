import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.page.html',
  styleUrls: ['./manage-task.page.scss'],
  standalone: false
})
export class ManageTaskPage implements OnInit {
  isEditMode = false;
  taskId: string | null = null;
  taskData = {
    title: '',
    description: '',
    taskDate: new Date().toISOString().split('T')[0]
  };
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = params['id'];
        this.taskData.title = params['title'] || '';
        this.taskData.description = params['description'] || '';
        this.taskData.taskDate = params['date'] || new Date().toISOString().split('T')[0];
      } else if (params['date']) {
        this.taskData.taskDate = params['date'];
      }
    });
  }


  async saveTask() {
    if (!this.taskData.title) {
      this.presentToast('Please provide a title');
      return;
    }

    if (!this.taskData.taskDate) {
      this.presentToast('Please provide a task date');
      return;
    }

    this.loading = true;
    const action = this.isEditMode && this.taskId
      ? this.taskService.updateTask(this.taskId, this.taskData)
      : this.taskService.createTask(this.taskData);

    action.subscribe({
      next: () => {
        this.loading = false;
        this.presentToast(`Task ${this.isEditMode ? 'updated' : 'created'} successfully`);
        this.navCtrl.back();
      },
      error: (err) => {
        this.loading = false;
        this.presentToast(err.error?.message || 'Error saving task');
      }
    });
  }

  async deleteTask() {
    if (!this.taskId) return;

    this.loading = true;
    this.taskService.deleteTask(this.taskId).subscribe({
      next: () => {
        this.loading = false;
        this.presentToast('Task deleted successfully');
        this.navCtrl.back();
      },
      error: (err) => {
        this.loading = false;
        this.presentToast('Error deleting task');
      }
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
