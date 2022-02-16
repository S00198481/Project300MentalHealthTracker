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
  dataScores: any;
  dates: any;

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
    },2400)
    
  }

}
