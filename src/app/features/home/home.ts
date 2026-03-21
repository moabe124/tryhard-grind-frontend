import { Component, inject, signal, OnInit } from '@angular/core';
import { GroupService } from '../../core/services/group.service';
import { GroupResponse } from '../../core/models/group.models';
import { HomeWithComponent } from './home-with/home-with';
import { HomeEmptyComponent } from './home-empty/home-empty';
import { CreateGroupModalComponent } from '../../shared/components/create-group-modal/create-group-modal';

@Component({
  selector: 'app-home',
  imports: [HomeWithComponent, HomeEmptyComponent, CreateGroupModalComponent],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private groupService = inject(GroupService);

  groups = signal<GroupResponse[]>([]);
  loading = signal(true);
  showModal = signal(false);

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

  onGroupCreated(group: GroupResponse) {
    this.groups.update(list => [...list, group]);
    this.showModal.set(false);
  }
}
