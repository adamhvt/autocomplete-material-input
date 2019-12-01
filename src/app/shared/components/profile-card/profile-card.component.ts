import { Component, OnInit, Input } from '@angular/core';
import { IGitHubUser } from 'src/app/app.service';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit {
  @Input() user: IGitHubUser;

  constructor() { }

  ngOnInit() {
  }

}
