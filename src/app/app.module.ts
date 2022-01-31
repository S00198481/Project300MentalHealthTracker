import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { RecorderComponent } from './recorder/recorder.component';

import { LoginComponent } from './login/login.component';
import { LoginService } from './service/login.service';
import { GraphComponent } from './graph/graph.component';
import { ChartsModule } from 'ng2-charts';
import { SentimentCorrelationComponent } from './sentiment-correlation/sentiment-correlation.component';


@NgModule({
  declarations: [
    AppComponent,
    RecorderComponent,
    LoginComponent,
    GraphComponent,
    SentimentCorrelationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [ LoginComponent, LoginService, FormBuilder],
  bootstrap: [AppComponent]
})
export class AppModule { }
