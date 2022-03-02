import { Container } from '@angular/compiler/src/i18n/i18n_ast';
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
  userLogsForDisplay: any[] = [];
  userLogsSentiment: JSON[] = [];
  activityLogs:JSON[] = [];
  dataScores: any;
  dates: any;
  dailyInsights: any[][];
  allScores:number[] = [];
  loaded: boolean = false;


  constructor(private awsService:AWSService) { }

  ngOnInit(): void {
    this.awsService.getRecordings();
    setTimeout(() => {
      console.log("getting graph data")
      this.currentUser = localStorage.getItem('username');
      this.userLogs = JSON.parse(localStorage.getItem('logs'))
      //this.userLogs.Items = this.userLogs.Items.sort((a, b) => (a.Date.S > b.Date.S ? 1 : -1));
      console.log(this.userLogs);
      
    this.calculatePositiveCorrelations()
    this.loaded = true;
    },2400)   

  }

  calculatePositiveCorrelations() {
    this.activityLogs = [];
    this.userLogsForDisplay = [];
    this.userLogsSentiment = [];
    this.userLogs.Items.forEach(log => {
      if (JSON.parse(log.Sentiment.S).type == "positive") {
        this.userLogsForDisplay.push((log));
        this.userLogsSentiment.push(JSON.parse(log.Sentiment.S));
        this.activityLogs.push(JSON.parse(log.Activities.S));
      }
    });
    console.log(this.userLogsForDisplay);
    console.log(this.activityLogs);
    console.log(this.userLogsSentiment);
    this.createCards("Positive", "success");
  }

  calculateNegativeCorrelations() {
    this.activityLogs = [];
    this.userLogsForDisplay = [];
    this.userLogsSentiment = [];
    this.userLogs.Items.forEach(log => {
      if (JSON.parse(log.Sentiment.S).type == "negative") {
        this.userLogsForDisplay.push((log));
        this.userLogsSentiment.push(JSON.parse(log.Sentiment.S));
        this.activityLogs.push(JSON.parse(log.Activities.S));
      }
    });
    console.log(this.userLogsForDisplay);
    console.log(this.activityLogs);
    console.log(this.userLogsSentiment);
    this.createCards("Negative", "danger");
  }

  createCards(sentiment:string, cardType:string) {
    var origin = document.getElementById("root");

    if(document.getElementById("container")) {
      var child = document.getElementById("container")
      origin.removeChild(child)
    }

    
    var root = document.createElement("div");
    root.classList.add("mx-auto", "row", "justify-content-center", "w-75");
    root.setAttribute("id", "container");
    if(root.firstChild != null) {
      while(root.hasChildNodes) {
        var elem = root.firstChild
        if(elem != null) {
          root.removeChild(elem);
        }
      }
    }
    
    for(var i=0; i<this.userLogsForDisplay.length; i++){
      var card = document.createElement('div');
      card.classList.add('card-body');

      var content = 
      `<div class="card border-${cardType} p-0 m-2 col-sm">
          <div class="card-header bg-${cardType} text-white">${this.userLogsForDisplay[i].Date.S}</div>
          <div class="card-body text-${cardType}Activity">
            <h5 class="card-title">${sentiment}</h5>
            <p class="card-text">Activities completed on this day:</p>
            <h5 class="card-text">${(this.activityLogs[i].toString()).replace(/,/g, ', ')}.</h5>
        </div>
      </div>`
      root.innerHTML += content;
      origin.appendChild(root)

    };
  }

  getEffect(): boolean {
    return false;
  }
}
