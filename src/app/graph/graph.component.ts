import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  errorMessage: any;

  constructor(private awsService:AWSService) { }

  ctx:any;
  chart:any;
  currentUser:string;
  userLogs:any;
  dataScores:number[] = [];
  dates:string[] = [];

  ngOnInit(): void {
    this.awsService.getRecordings();
    setTimeout(() => {
      this.currentUser = localStorage.getItem('username');
      this.userLogs = JSON.parse(localStorage.getItem('logs'))
      console.log(this.currentUser)
      console.log(this.userLogs)
      for (let i = 0; i < this.userLogs.Count; i++) {
        let sentiment = JSON.parse(this.userLogs.Items[i].Sentiment.S);
        this.dataScores.push(sentiment.score)
        let date = this.userLogs.Items[i].Date.S;
        this.dates.push(date)
      }
      console.log(this.dataScores)
      console.log(this.dates)
    },600)
 
    setTimeout(() => {
    this.ctx = (<HTMLElement>document.getElementById('moodChart'));
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [{ data: this.dataScores, label:"stop taking your meds"}]
      }
    })
    }, 800);
  }

}