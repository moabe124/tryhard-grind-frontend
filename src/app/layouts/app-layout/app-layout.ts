import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../shared/components/header/header';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <div class="pt-16 min-h-screen">
      <router-outlet />
    </div>
  `,
})
export class AppLayoutComponent {}
