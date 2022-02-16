import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mental-health-tracker';

  constructor(private Login: LoginComponent){}

  doShow:boolean;
  loginShow:boolean = true;
  recorderShow:boolean =false;
  chartShow:boolean=true;
  sentimentShow : boolean =false;

  

  ngOnInit(doShow)
  {
    doShow = this.Login.isShown
  }

  getShow(isShown:boolean) {
    this.doShow = !isShown;
    this.loginShow = false;
  }

  homeClick() {
    if(!this.loginShow) {
      this.doShow = true;
      this.chartShow = true;
      this.sentimentShow = false;
      this.recorderShow = false;
    }
  }

  recordClick() {
    if(!this.loginShow) {
      this.chartShow = false;
      this.sentimentShow = false;
      this.recorderShow = true;
    }
  }
  sentimentClick() {
    if(!this.loginShow) {
      this.chartShow = false;
      this.recorderShow = false;
      this.sentimentShow = true;
    }
  }
}