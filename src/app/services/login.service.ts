import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private formBuilder: FormBuilder
  ) { }

  username = "username";
  password = "password";

  loginForm = this.formBuilder.group({
    name:'',
    pass: ''
  })

  onSubmit(inputUsername:string, inputPassword:string) {
    if (inputUsername == this.username && inputPassword == this.password)
    {
      return true;
    }
    else{
      return false;
    }
  }
}
