import { Component, output, signal } from '@angular/core';
import { JoinModalComponent } from '../../../shared/components/join-modal/join-modal';

@Component({
  selector: 'app-home-empty',
  imports: [JoinModalComponent],
  templateUrl: './home-empty.html',
})
export class HomeEmptyComponent {
  openModal = output<void>();
  showJoinModal = signal(false);
}
