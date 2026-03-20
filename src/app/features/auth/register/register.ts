import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  nick = '';
  email = '';
  password = '';
  confirmPassword = '';
  acceptTerms = false;
  loading = signal(false);
  error = signal('');

  get passwordMismatch(): boolean {
    return this.confirmPassword.length > 0 && this.password !== this.confirmPassword;
  }

  submit() {
    if (this.password !== this.confirmPassword) {
      this.error.set('As senhas não coincidem.');
      return;
    }
    if (!this.acceptTerms) {
      this.error.set('Aceite os termos de serviço para continuar.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    this.auth
      .register({ nick: this.nick, email: this.email, password: this.password })
      .subscribe({
        next: () => this.router.navigate(['/groups']),
        error: (err) => {
          this.error.set(err.error?.title ?? 'Erro ao criar conta.');
          this.loading.set(false);
        },
      });
  }
}
