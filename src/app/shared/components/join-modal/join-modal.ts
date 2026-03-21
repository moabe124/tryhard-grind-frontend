import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupService } from '../../../core/services/group.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-join-modal',
  imports: [FormsModule],
  templateUrl: './join-modal.html',
})
export class JoinModalComponent {
  private groupService = inject(GroupService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  closed = output<void>();

  link = '';
  loading = signal(false);
  error = signal('');

  get isValid() {
    return this.extractToken() !== null;
  }

  extractToken(): string | null {
    const value = this.link.trim();
    if (!value) return null;

    // Suporta URL completa (http://...../join/TOKEN) ou token direto
    const match = value.match(/\/join\/([a-zA-Z0-9]+)$/);
    if (match) return match[1];

    // Token puro (sem barra)
    if (/^[a-zA-Z0-9]{20,}$/.test(value)) return value;

    return null;
  }

  async paste() {
    try {
      const text = await navigator.clipboard.readText();
      this.link = text;
      this.error.set('');
    } catch {
      this.error.set('Não foi possível acessar a área de transferência.');
    }
  }

  close() {
    this.closed.emit();
  }

  submit() {
    const token = this.extractToken();
    if (!token || this.loading()) return;

    this.loading.set(true);
    this.error.set('');

    this.groupService.joinByToken(token).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.toastService.show(`Você entrou em ${res.groupName}!`, 'success');
        this.closed.emit();
        this.router.navigate(['/groups', res.groupId]);
      },
      error: (err) => {
        this.error.set(err.error?.detail ?? err.error?.title ?? 'Convite inválido ou já utilizado.');
        this.loading.set(false);
      },
    });
  }
}
