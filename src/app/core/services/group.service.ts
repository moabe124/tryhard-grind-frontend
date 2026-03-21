import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { CreateGroupRequest, UpdateGroupRequest, GroupResponse, GroupRankingResponse, InviteResponse, JoinGroupResponse } from '../models/group.models';

@Injectable({ providedIn: 'root' })
export class GroupService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/groups`;

  getMyGroups() {
    return this.http.get<GroupResponse[]>(this.baseUrl);
  }

  create(request: CreateGroupRequest) {
    return this.http.post<GroupResponse>(this.baseUrl, request);
  }

  update(id: string, request: UpdateGroupRequest) {
    return this.http.put<GroupResponse>(`${this.baseUrl}/${id}`, request);
  }

  getById(id: string) {
    return this.http.get<GroupResponse>(`${this.baseUrl}/${id}`);
  }

  getRanking(id: string, period: string) {
    return this.http.get<GroupRankingResponse>(`${this.baseUrl}/${id}/ranking?period=${period}`);
  }

  joinByToken(token: string) {
    return this.http.post<JoinGroupResponse>(`${this.baseUrl}/join/${token}`, {});
  }

  generateInvite(id: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/${id}/invite`, {}).pipe(
      map(({ token }) => ({
        token,
        inviteUrl: `${environment.appUrl}/join/${token}`,
      } as InviteResponse))
    );
  }
}
