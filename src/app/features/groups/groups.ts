import { Component, signal } from '@angular/core';
import { GroupsWithComponent } from './groups-with/groups-with';
import { GroupsEmptyComponent } from './groups-empty/groups-empty';

@Component({
  selector: 'app-groups',
  imports: [GroupsWithComponent, GroupsEmptyComponent],
  templateUrl: './groups.html',
})
export class GroupsComponent {
  // TODO: remover toggle de debug quando cadastro de grupos estiver implementado
  hasGroups = signal(true);

  toggleDebug() {
    this.hasGroups.update(v => !v);
  }
}
