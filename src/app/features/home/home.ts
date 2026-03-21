import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { GroupService } from '../../core/services/group.service';
import { GroupResponse } from '../../core/models/group.models';
import { GroupModalService } from '../../core/services/group-modal.service';
import { HomeWithComponent } from './home-with/home-with';
import { HomeEmptyComponent } from './home-empty/home-empty';

@Component({
  selector: 'app-home',
  imports: [HomeWithComponent, HomeEmptyComponent],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private groupService = inject(GroupService);
  modalService = inject(GroupModalService);

  groups = signal<GroupResponse[]>([]);
  loading = signal(true);

  constructor() {
    // recarrega lista quando o modal fecha (pode ter criado um grupo)
    effect(() => {
      if (!this.modalService.isOpen()) {
        this.loadGroups();
      }
    });
  }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups() {
    this.loading.set(true);
    this.groupService.getMyGroups().subscribe({
      next: (groups) => {
        this.groups.set(groups);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
