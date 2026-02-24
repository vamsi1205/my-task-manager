import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  isLogin = true;
  loading = false;
  userData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    if (this.authService.getUser()) {
      this.router.navigate(['/home']);
    }
  }

  toggleMode() {
    this.isLogin = !this.isLogin;
  }

  async submit() {
    if (!this.userData.email || !this.userData.password) {
      this.presentToast('Please fill in all fields');
      return;
    }

    if (!this.isLogin && this.userData.password !== this.userData.confirmPassword) {
      this.presentToast('Passwords do not match');
      return;
    }

    this.loading = true;
    const action = this.isLogin 
      ? this.authService.login({ email: this.userData.email, password: this.userData.password })
      : this.authService.signup({ name: this.userData.name, email: this.userData.email, password: this.userData.password });

    action.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.presentToast(err.error?.message || 'An error occurred');
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
