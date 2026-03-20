import { Component, inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-groups',
  template: `
    <div style="padding: 2rem;">
      <h1>Groups (placeholder)</h1>
      <button (click)="logout()" style="margin-top: 1rem; padding: 0.5rem 1rem; cursor: pointer;">
        Logout
      </button>
    </div>
  `,
})
export class GroupsComponent {
  private auth = inject(AuthService);

  logout() {
    this.auth.logout();
  }
}
