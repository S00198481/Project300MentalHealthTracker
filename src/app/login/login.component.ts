import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { stringify } from 'querystring';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() isShown = new EventEmitter<boolean>();

  constructor(public signInService: LoginService) {
   }

  inputName:string;
  inputPassword:string;

  ngOnInit(): void {

  }

  componentOnSubmit()
  {
    this.inputName = (<HTMLInputElement>document.getElementById("usernameField")).value;
    this.inputPassword = (<HTMLInputElement>document.getElementById("passwordField")).value;

    if (this.signInService.onSubmit(this.inputName, this.inputPassword) == true)
    {
      console.log("successful")
        this.isShown.emit(false);
    }
    else {
      this.isShown.emit(true);
    }
  }

}
