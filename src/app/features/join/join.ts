import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../core/services/group.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.html',
})
export class JoinComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private groupService = inject(GroupService);

  loading = signal(true);
  error = signal('');
  success = signal('');

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token')!;
    this.groupService.joinByToken(token).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.success.set(res.groupName);
        setTimeout(() => this.router.navigate(['/home']), 2500);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set(err.error?.detail ?? err.error?.title ?? 'Convite inválido ou já utilizado.');
      },
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
