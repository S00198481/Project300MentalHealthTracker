import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { DynamoDB } from 'node_modules/aws-sdk';
import { Credentials } from 'node_modules/aws-sdk';
import { v4 as uuidv4 } from 'node_modules/uuid';


@Injectable({
  providedIn: 'root'
})
export class AWSService {

  client = new DynamoDB({ region: "eu-west-1" });
  cred = new Credentials("AKIAWDJHI5VVRKEITGNG", "6sm+skj7bhPe3eTcdirE2YSgI0Gol8f4615EZ5QS");
  data: any;
  key: any;
  params: any;

  constructor() { }

  async sendData(text: string, emotion: string, sentiment: string) {
    this.client.config.region = "eu-west-1"
    this.client.config.credentials = this.cred
    this.client.config.update({ region: "eu-west-1" })
    this.key = uuidv4()
    console.log(this.key)
    this.params = {
      TableName: "AppRecordings",
      Item: {
        "UserID": {
          S: "username"
        },
        "UUID": {
          S: this.key
        },
        "Text": {
          S: text
        },
        "Emotion": {
          S: emotion
        },
        "Sentiment": {
          S: sentiment
        }
      }
    };
    console.log(this.params)
    this.client.putItem(this.params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else console.log(data)
    });
  }

  getRecordings() {
    this.client.config.region = "eu-west-1"
    this.client.config.credentials = this.cred
    this.client.config.update({ region: "eu-west-1" })
    var params = {
      TableName : "AppRecordings",
      KeyConditionExpression : "UserID = :id",
      ExpressionAttributeValues: {
        ":id": {
          S: "username"
         }
       }
    }
    this.client.query(params, function(err, data) {
      if (err) {
        console.error("Unable to read item. Error JSON:", JSON.stringify(err,
                null, 2));
    } else {
        console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    }
    });
  }
}