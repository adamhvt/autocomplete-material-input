import { Component, OnInit, Output, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from '../../../../app.service';
import { switchMap, debounceTime, tap, finalize, distinctUntilChanged, filter, take } from 'rxjs/operators';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent<T> implements OnInit {
  @Input() displayWith: string;
  @Output() selectionChange = new Subject<T>();
  filteredItems: T[] = [];
  usersForm: FormGroup;
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
        filter((term: string) => term.length > 0),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(term => this.appService.search<T>({ name: term })
          .pipe(
            take(1),
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(result => this.filteredItems = result.items);
  }

  displayFn(item) {
    if (item) { return item[this.displayWith] || ''; }
  }

  onUserSelected(changes: MatOptionSelectionChange) {
    this.selectionChange.next(changes.source.value);
  }

}
