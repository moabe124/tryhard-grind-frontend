import { Component, input, output } from '@angular/core';
import { GroupResponse } from '../../../core/models/group.models';

@Component({
  selector: 'app-home-with',
  templateUrl: './home-with.html',
})
export class HomeWithComponent {
  groups = input.required<GroupResponse[]>();
  openModal = output<void>();
}
