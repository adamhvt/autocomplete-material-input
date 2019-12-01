import { Component, OnInit } from '@angular/core';
import { IGitHubUser } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  selectedUser: IGitHubUser;

  constructor() { }

  ngOnInit() {

  }

  onUserSelected(user: IGitHubUser) {
    this.selectedUser = user;
  }
}
