import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { HelperService } from '../../services/helper.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [
    MenubarModule,
    AvatarModule,
    ButtonModule,
    BadgeModule,
    InputTextModule,
    MenuModule,
  ],
})
export class NavbarComponent implements OnInit {
  projectItems: MenuItem[] = [];
  showSideBar = false;

  constructor(private helperService: HelperService , private router:Router , private authService: AuthService) {}

  ngOnInit() {
    this.showSideBar = this.helperService?.isSideBarShown;
  }

  toggleSideBar() {
    this.helperService.isSideBarShown = !this.helperService?.isSideBarShown;
  }

  onLogout(): void {
   this.authService.logout()
    this.router.navigate(['/login']);

  }
}
