import { Component, OnInit } from '@angular/core';
import { threadId } from 'worker_threads';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activity: string[] = new Array();

  constructor(public AWSService : AWSService) { }

  ngOnInit(): void {
  }

  handleActivities(buttonNumber: number) {
    switch(buttonNumber) {
      case 1:
        this.activity.push("Running");
        console.log(this.activity)
        break;
      case 2:
        this.activity.push("Walking");
        console.log(this.activity)
        break;
      case 3:
        this.activity.push("Swimming");
        console.log(this.activity)
        break;
      case 4:
       this.activity.push("Cycling");
        console.log(this.activity)
        break;
      case 5:
        this.activity.push("Cumming");
        console.log(this.activity)
        break;
      default:
        console.log("No activity undertaken.");
        console.log(this.activity)
        break;
    }
  }

  submitActivityData() {
  }

}
