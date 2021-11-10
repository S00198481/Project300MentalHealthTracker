import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RecorderComponent } from './recorder/recorder.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';


@NgModule({
  declarations: [
    AppComponent,
    RecorderComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ LoginComponent, LoginService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
