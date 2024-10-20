import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule, InputTextModule, PasswordModule, ButtonModule],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: 'mor_2314',
    password: '83r5^_',
  };
  showPassword = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.logout();
  }

  onSubmit() {
    const { username, password } = this.loginData;
    this.authService.login(username, password).then((success) => {
      if (success) {
        this.router.navigate(['/admin/products']);
      } else {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    });
  }
}
