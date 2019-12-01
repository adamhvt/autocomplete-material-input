import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IGitHubUser {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  organizations_url: string;
  received_events_url: string;
  repos_url: string;
  score: number;
  site_admin: boolean;
  starred_url: string;
  subscriptions_url: string;
  type: string;
  url: string;
}

export interface IGitHubUserResponse {
  incomplete_results: boolean;
  items: Array<IGitHubUser>;
  total_count: number;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  search(filter: { name: string }): Observable<IGitHubUserResponse> {
    return this.http.get<IGitHubUserResponse>(`https://api.github.com/search/users?q=${filter.name}`);
  }
}
