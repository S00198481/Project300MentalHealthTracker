import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { stringify } from 'querystring';
import { LoginService } from '../service/login.service';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() isShown = new EventEmitter<boolean>();

  constructor(public signInService: LoginService, public awsService: AWSService) {
  }

  inputName: string;
  inputPassword: string;
  users: any;

  ngOnInit(): void {

  }

  async componentOnSubmit() {
    this.inputName = (<HTMLInputElement>document.getElementById("usernameField")).value;
    this.inputPassword = (<HTMLInputElement>document.getElementById("passwordField")).value;

    if (this.awsService.getUsers(this.inputName, this.inputPassword) == false) {
      if (this.awsService.getUsers(this.inputName, this.inputPassword) == false) {
        console.log("successful")
        this.isShown.emit(false);
      }
      else {
        console.log("failure")
        this.isShown.emit(true);
      }
    }
    else {
      console.log("failure")
      this.isShown.emit(true);
    }
  }
}
