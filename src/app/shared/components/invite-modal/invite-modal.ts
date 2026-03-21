import { Component, input, output, signal } from '@angular/core';
import { InviteResponse } from '../../../core/models/group.models';

@Component({
  selector: 'app-invite-modal',
  templateUrl: './invite-modal.html',
})
export class InviteModalComponent {
  invite = input.required<InviteResponse>();
  closed = output<void>();

  copied = signal(false);

  copy() {
    navigator.clipboard.writeText(this.invite().inviteUrl).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2500);
    });
  }

  close() {
    this.closed.emit();
  }
}
