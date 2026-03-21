import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateGroupRequest, GroupResponse } from '../models/group.models';

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
}
