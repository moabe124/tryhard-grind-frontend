import { Component, OnInit, inject, signal, computed, effect, untracked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../../core/services/group.service';
import { GroupModalService } from '../../../core/services/group-modal.service';
import { GroupResponse, GroupRankingResponse, GroupMemberResponse, InviteResponse, Tier } from '../../../core/models/group.models';
import { CommonModule } from '@angular/common';
import { InviteModalComponent } from '../../../shared/components/invite-modal/invite-modal';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.html',
  imports: [CommonModule, InviteModalComponent],
})
export class GroupDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private groupService = inject(GroupService);
  groupModalService = inject(GroupModalService);

  group = signal<GroupResponse | null>(null);
  ranking = signal<GroupRankingResponse | null>(null);
  invite = signal<InviteResponse | null>(null);
  inviteLoading = signal(false);
  loading = signal(true);

  top3 = computed(() => this.ranking()?.members.slice(0, 3) ?? []);
  allMembers = computed(() => this.ranking()?.members ?? []);

  constructor() {
    effect(() => {
      if (!this.groupModalService.isOpen()) {
        const id = this.route.snapshot.paramMap.get('id');
        if (id && untracked(this.group)) {
          this.groupService.getById(id).subscribe({ next: (g) => this.group.set(g) });
        }
      }
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.groupService.getById(id).subscribe({ next: (g) => this.group.set(g) });
    this.loadRanking(id);
  }

  openEdit() {
    if (this.group()) this.groupModalService.openForEdit(this.group()!);
  }

  generateInvite() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.inviteLoading.set(true);
    this.groupService.generateInvite(id).subscribe({
      next: (r) => { this.invite.set(r); this.inviteLoading.set(false); },
      error: () => this.inviteLoading.set(false),
    });
  }

  closeInvite() {
    this.invite.set(null);
  }

  private loadRanking(id: string) {
    this.loading.set(true);
    this.groupService.getRanking(id, 'month').subscribe({
      next: (r) => { this.ranking.set(r); this.loading.set(false); },
      error: () => this.loading.set(false),
    });
  }

  tierClass(tier: Tier): string {
    const map: Record<Tier, string> = {
      Diamond: 'bg-tier-diamond/10 text-tier-diamond border-tier-diamond/20',
      Platinum: 'bg-tier-platinum/10 text-tier-platinum border-tier-platinum/20',
      Gold: 'bg-tier-gold/10 text-tier-gold border-tier-gold/20',
      Silver: 'bg-tier-silver/10 text-tier-silver border-tier-silver/20',
      Bronze: 'bg-tier-bronze/10 text-tier-bronze border-tier-bronze/20',
    };
    return map[tier] ?? '';
  }

  tierLabel(tier: Tier): string {
    const map: Record<Tier, string> = {
      Diamond: 'Diamante',
      Platinum: 'Platina',
      Gold: 'Ouro',
      Silver: 'Prata',
      Bronze: 'Bronze',
    };
    return map[tier] ?? tier;
  }

  deltaColor(delta: number | null): string {
    if (delta === null) return 'text-on-surface-variant/40';
    return delta > 0 ? 'text-emerald-400' : delta < 0 ? 'text-rose-400' : 'text-on-surface-variant/40';
  }

  deltaLabel(delta: number | null): string {
    if (delta === null) return '--';
    return delta > 0 ? `+${delta}` : `${delta}`;
  }

  get1st(): GroupMemberResponse | null { return this.top3()[0] ?? null; }
  get2nd(): GroupMemberResponse | null { return this.top3()[1] ?? null; }
  get3rd(): GroupMemberResponse | null { return this.top3()[2] ?? null; }
}
