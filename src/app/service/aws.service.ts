import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DynamoDB } from 'node_modules/aws-sdk';
import {  } from 'node_modules/aws-sdk';
/// <reference types="aws-sdk" />

@Injectable({
  providedIn: 'root'
})
export class AWSService {

  client = new DynamoDB();

  constructor() { }
}
