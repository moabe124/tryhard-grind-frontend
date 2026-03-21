import { Component, inject, OnInit, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GroupService } from '../../../core/services/group.service';
import { GroupModalService } from '../../../core/services/group-modal.service';
import { GroupResponse } from '../../../core/models/group.models';

const GAMES = [
  'League of Legends',
  'Valorant',
  'Counter-Strike 2',
  'Teamfight Tactics',
  'Outros',
];

@Component({
  selector: 'app-create-group-modal',
  imports: [FormsModule],
  templateUrl: './create-group-modal.html',
})
export class CreateGroupModalComponent implements OnInit {
  private groupService = inject(GroupService);
  private modalService = inject(GroupModalService);

  created = output<GroupResponse>();
  closed = output<void>();

  readonly games = GAMES;

  name = '';
  game = GAMES[0];
  baseWin = 50;
  baseLoss = 20;
  kdaWeight = 5;

  loading = signal(false);
  error = signal('');

  get editGroup() { return this.modalService.editGroup(); }
  get isEditing() { return this.editGroup !== null; }

  ngOnInit() {
    const g = this.editGroup;
    if (g) {
      this.name = g.name;
      this.game = g.game;
      this.baseWin = g.scoringConfig.baseWin;
      this.baseLoss = g.scoringConfig.baseLoss;
      this.kdaWeight = g.scoringConfig.kdaWeight;
    }
  }

  get isValid() {
    return this.name.trim().length >= 3;
  }

  get winPreview() {
    return this.baseWin + Math.round(this.kdaWeight * 4);
  }

  close() {
    this.closed.emit();
  }

  submit() {
    if (!this.isValid || this.loading()) return;

    this.loading.set(true);
    this.error.set('');

    if (this.isEditing) {
      this.groupService.update(this.editGroup!.id, {
        name: this.name.trim(),
        scoringConfig: { baseWin: this.baseWin, baseLoss: this.baseLoss, kdaWeight: this.kdaWeight },
      }).subscribe({
        next: (group) => { this.loading.set(false); this.created.emit(group); },
        error: (err) => { this.error.set(err.error?.title ?? 'Erro ao editar grupo.'); this.loading.set(false); },
      });
    } else {
      this.groupService.create({
        name: this.name.trim(),
        game: this.game,
        scoringConfig: { baseWin: this.baseWin, baseLoss: this.baseLoss, kdaWeight: this.kdaWeight },
      }).subscribe({
        next: (group) => { this.loading.set(false); this.created.emit(group); },
        error: (err) => { this.error.set(err.error?.title ?? 'Erro ao criar grupo.'); this.loading.set(false); },
      });
    }
  }
}
