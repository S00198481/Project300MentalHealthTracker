import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AwsService } from 'aws-sdk/clients/macie2';
import { delay } from 'rxjs/operators';
import { AWSService } from './aws.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {  
  username:any;
  password:any;
  users:JSON;
  constructor(private formBuilder: FormBuilder, private awsService: AWSService) {
  }


  onSubmit(inputUsername: string, inputPassword: string) : boolean {
    //let bool = this.awsService.getUsers(inputUsername, inputPassword);
    let bool = false;
    console.log(bool)
    setTimeout(() => {
      if(bool == true)
    {
      console.log("successful login");
      return true;
    }
    console.log("login failed");
    return false;
    },2000);
    return false;
  }
}
