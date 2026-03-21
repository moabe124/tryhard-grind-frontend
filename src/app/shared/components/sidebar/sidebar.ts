import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { GroupModalService } from '../../../core/services/group-modal.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  auth = inject(AuthService);
  groupModal = inject(GroupModalService);

  logout() {
    this.auth.logout();
  }
}
