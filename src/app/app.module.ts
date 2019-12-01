import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { ProfileCardComponent } from './shared/components/profile-card/profile-card.component';
import { AutocompleteInputComponent } from './shared/components/autocomplete-input/autocomplete-input/autocomplete-input.component';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteInputComponent,
    ProfileCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
