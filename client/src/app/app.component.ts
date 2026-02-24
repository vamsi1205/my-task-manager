import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Tasks', url: '/manage-tasks', icon: 'list' },
    { title: 'Progress', url: '/progress', icon: 'stats-chart' },
    { title: 'Profile', url: '/profile', icon: 'person' },
  ];

  constructor(
    public authService: AuthService,
    public loaderService: LoaderService,
    private router: Router,
    private menu: MenuController
  ) {}

  logout() {
    this.authService.logout();
    this.menu.close();
    this.router.navigate(['/login']);
  }
}
