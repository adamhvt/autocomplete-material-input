import { Component, OnInit } from '@angular/core';
import { User } from './user.class';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService, IGitHubUser } from './app.service';
import { switchMap, debounceTime, tap, finalize, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  filteredUsers: IGitHubUser[] = [];
  usersForm: FormGroup;
  selectedUser: IGitHubUser;
  isLoading = false;

  constructor(private fb: FormBuilder, private appService: AppService) { }

  ngOnInit() {
    this.usersForm = this.fb.group({
      userInput: null
    });

    this.usersForm
      .get('userInput')
      .valueChanges
      .pipe(
        filter((value: string) => value.length > 0),
        debounceTime(300),
        tap(() => this.isLoading = true),
        distinctUntilChanged(),
        switchMap(value => this.appService.search({ name: value })
          .pipe(
            take(1),
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(result => this.filteredUsers = result.items);
  }

  displayFn(user: User) {
    if (user) { return user.login; }
  }

  onUserSelected(changes: MatOptionSelectionChange) {
    this.selectedUser = changes.source.value;
  }
}
