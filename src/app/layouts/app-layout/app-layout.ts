import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';
import { CreateGroupModalComponent } from '../../shared/components/create-group-modal/create-group-modal';
import { GroupModalService } from '../../core/services/group-modal.service';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, CreateGroupModalComponent],
  template: `
    <app-header />
    <app-sidebar />
    <main class="md:ml-64 pt-16 min-h-screen">
      <router-outlet />
    </main>

    @if (modalService.isOpen()) {
      <app-create-group-modal
        (created)="modalService.close()"
        (closed)="modalService.close()"
      />
    }
  `,
})
export class AppLayoutComponent {
  modalService = inject(GroupModalService);
}
