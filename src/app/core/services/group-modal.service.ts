import { Injectable, signal } from '@angular/core';
import { GroupResponse } from '../models/group.models';

@Injectable({ providedIn: 'root' })
export class GroupModalService {
  isOpen = signal(false);
  editGroup = signal<GroupResponse | null>(null);

  open() {
    this.editGroup.set(null);
    this.isOpen.set(true);
  }

  openForEdit(group: GroupResponse) {
    this.editGroup.set(group);
    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
    this.editGroup.set(null);
  }
}
