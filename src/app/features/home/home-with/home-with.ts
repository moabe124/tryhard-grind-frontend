import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { GroupResponse } from '../../../core/models/group.models';

@Component({
  selector: 'app-home-with',
  templateUrl: './home-with.html',
})
export class HomeWithComponent {
  private router = inject(Router);

  groups = input.required<GroupResponse[]>();
  openModal = output<void>();

  goToGroup(id: string) {
    this.router.navigate(['/groups', id]);
  }
}
