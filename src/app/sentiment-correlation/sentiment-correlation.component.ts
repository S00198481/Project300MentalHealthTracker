import { Component, OnInit } from '@angular/core';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-sentiment-correlation',
  templateUrl: './sentiment-correlation.component.html',
  styleUrls: ['./sentiment-correlation.component.css']
})
export class SentimentCorrelationComponent implements OnInit {
  currentUser: string;
  userLogs: any;
  userLogsForDisplay: JSON[] = [];
  activityLogs:JSON[] = [];
  dataScores: any;
  dates: any;
  dailyInsights: any[][];
  allScores:number[] = [];


  constructor(private awsService:AWSService) { }

  ngOnInit(): void {
    this.awsService.getRecordings();
    setTimeout(() => {
      console.log("getting graph data")
      this.currentUser = localStorage.getItem('username');
      this.userLogs = JSON.parse(localStorage.getItem('logs'))
      //this.userLogs.Items = this.userLogs.Items.sort((a, b) => (a.Date.S > b.Date.S ? 1 : -1));
      console.log(this.userLogs);
      console.log("hello");
      this.calculatePositiveCorrelations();
    },2400)   
  }

  calculatePositiveCorrelations() {
    this.userLogs.Items.forEach(log => {
      if (JSON.parse(log.Sentiment.S).type == "positive") {
        this.userLogsForDisplay.push(JSON.parse(log.Sentiment.S));
        this.activityLogs.push(JSON.parse(log.Activities.S));
      }
    });
    console.log(this.userLogsForDisplay);
    console.log(this.activityLogs);
  }

  calculateNegativeCorrelations() {
    this.userLogs.Items.forEach(log => {
      if (JSON.parse(log.Sentiment.S).type == "negative") {
        this.userLogsForDisplay.push(JSON.parse(log.Sentiment.S));
      }
    });
    console.log(this.userLogsForDisplay);
  }

  getEffect(): boolean {
    return false;
  }
}
