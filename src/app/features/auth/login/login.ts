import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  route = inject(ActivatedRoute);

  email = '';
  password = '';
  rememberMe = false;
  loading = signal(false);
  error = signal('');

  submit() {
    this.loading.set(true);
    this.error.set('');

    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        this.router.navigateByUrl(redirect ?? '/home');
      },
      error: (err) => {
        this.error.set(err.error?.title ?? 'Credenciais inválidas.');
        this.loading.set(false);
      },
    });
  }
}
