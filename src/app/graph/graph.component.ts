import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets,ChartLineOptions,GridLineOptions} from 'chart.js';
import { Color,Label,ChartsModule} from 'ng2-charts';
import { utils } from 'protractor';
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
      console.log("getting graph data")
      this.currentUser = localStorage.getItem('username');
      this.userLogs = JSON.parse(localStorage.getItem('logs'))
      this.userLogs.Items = this.userLogs.Items.sort((a, b) => (a.Date.S > b.Date.S ? 1 : -1));
      for (let i = 0; i < this.userLogs.Count; i++) {
        let sentiment = JSON.parse(this.userLogs.Items[i].Sentiment.S);
        this.dataScores.push(sentiment.score)
        let date = this.userLogs.Items[i].Date.S;
        this.dates.push(date)
      }
    },2400)
    console.log(this.dataScores)
    console.log(this.dates)
 
    setTimeout(() => {
    this.ctx = (<HTMLElement>document.getElementById('moodChart'));
    this.chart = new Chart(this.ctx, {
      type: 'line',
      options:{
        animation:{
          duration: 2000,
          easing: 'easeOutExpo'
        },
        responsive: true
      },
      plugins:[{
        
      }],
      data: {
        labels: this.dates,
        datasets: [{ data: this.dataScores, label:"Daily Progression",
        borderColor:'#009090',
        pointStyle:'rectRot',
        pointRadius:7,
        fill:'false'
        
      }]
      }
    })
    }, 2500);
    
  }

  compare( a, b ) {
    if ( a.Date < b.Date ){
      return -1;
    }
    if ( a.Date > b.Date ){
      return 1;
    }
    return 0;
  }
  

}