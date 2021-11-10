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

  ngOnInit(doShow)
  {
    doShow = this.Login.isShown
    .subscribe(
      doShow => this.Login.isShown
    );
  }

  getShow(isShown:boolean) {
    this.doShow = !isShown;
    this.loginShow = false;
  }
}