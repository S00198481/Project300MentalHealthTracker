import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public signInService: LoginService) { }

  inputName:string;
  inputPassword:string;

  ngOnInit(): void {
  }

  componentOnSubmit()
  {
    if (this.signInService.onSubmit(this.inputName, this.inputPassword) == true)
    {

    }
  }

}
