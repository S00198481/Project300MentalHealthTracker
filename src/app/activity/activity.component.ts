import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  activity: string[] = null;

  constructor() { }

  ngOnInit(): void {

  }

  handleActivities(buttonNumber: number): void {
    switch(buttonNumber) {
      case 1:
        this.activity.push("Running");
        break;
      case 2:
        this.activity.push("Walking");
        break;
      case 3:
        this.activity.push("Swimming");
        break;
      case 4:
        this.activity.push("Cycling");
        break;
      case 5:
        this.activity.push("Cumming");
        break;
      default:
        console.log("No activity undertaken.");
        break;
    }
  }

}
