import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  template: `
    <app-header />
    <app-sidebar />
    <main class="md:ml-64 pt-16 min-h-screen">
      <router-outlet />
    </main>
  `,
})
export class AppLayoutComponent {}
