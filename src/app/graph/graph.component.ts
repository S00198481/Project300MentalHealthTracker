import { Component, OnInit } from '@angular/core';
import { Chart, ChartDataSets, ChartLineOptions, GridLineOptions } from 'chart.js';
import { Color, Label, ChartsModule } from 'ng2-charts';
import { utils } from 'protractor';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  errorMessage: any;

  constructor(private awsService: AWSService) { }

  ctx: any;
  chart: any;
  chart2: any;
  currentUser: string;
  userLogs: any;
  dataScores: number[] = [];
  dates: string[] = [];
  selectedDayIndex: number;
  alertHide: boolean = false;
  loaded: boolean = false;

  ngOnInit(): void {
    this.awsService.getRecordings();
    setTimeout(() => {
      console.log("getting graph data")
      this.currentUser = localStorage.getItem('username');
      this.userLogs = JSON.parse(localStorage.getItem('logs'))
      this.userLogs.Items = this.userLogs.Items.sort((a, b) => (a.Date.S > b.Date.S ? 1 : -1));
      for (let i = 0; i < this.userLogs.Count; i++) {
        let sentiment = JSON.parse(this.userLogs.Items[i].Sentiment.S);
        this.dataScores.push((sentiment.score * 100) * 2)
        let date = this.userLogs.Items[i].Date.S;
        this.dates.push(date)
      }
    }, 2400)
    console.log(this.dataScores)
    console.log(this.dates)

    setTimeout(() => {
      this.ctx = (<HTMLElement>document.getElementById('moodChart'));
      this.chart = new Chart(this.ctx, {
        type: 'line',
        options: {
          legend: {
            display: false
          },
          onClick: this.showData.bind(this),
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function (tooltipItem, data) {
                var allData: any[] = data.datasets[tooltipItem.datasetIndex].data;
                let sum = 0;
                let dataArr = data.datasets[0].data;
                dataArr.forEach(data => {
                  sum += data;
                });
                var tooltipData: number = allData[tooltipItem.index];
                tooltipData = (tooltipData) * 100

                if(tooltipData > 0) {
                  return (Math.round(tooltipData / sum)) + "% Positive";
                }
                if(tooltipData < 0) {
                  return (Math.round((tooltipData / sum))*-1) + "% Negative";
                }
              }
            }
          }
        },
        data: {
          labels: this.dates,
          datasets: [{
            data: this.dataScores, label: "Daily Progression",
            borderColor: '#009090',
            pointStyle: 'rectRot',
            pointRadius: 10,
            pointHoverRadius: 20,
            fill: 'true'
          }]
        }
      })
      document.getElementById('username').innerText = "Hello " + this.currentUser + ", here is your report";
      this.loaded = true;
    }, 2500);
  }

  showData(evt: any) {
    var data: JSON = this.chart.getElementsAtEvent(evt)
    console.log(data);
    if (data[0] == null) {
      return;
    }
    if (this.chart2 != null) {
      this.chart2.destroy();
    }
    if (data[0] != null) {
      var index: number = data[0]._index
      console.log(index)

      document.getElementById('day').textContent = "Daily Breakdown - " + this.userLogs.Items[index].Date.S

      var dayData: any = this.userLogs.Items[index]
      console.log(dayData)
      var dayEmotions: any = JSON.parse(dayData.Emotion.S);
      var emotionObject = dayEmotions.emotion_scores
      console.log(emotionObject)

      var barEmotions: any = [emotionObject.anger, emotionObject.disgust, emotionObject.fear, emotionObject.joy, emotionObject.sadness, emotionObject.surprise]
      var barLabels: any = ["Anger", "Disgust", "Fear", "Joy", "Sadness", "Surprise"]


      this.ctx = (<HTMLElement>document.getElementById('emotionChart'));
      this.chart2 = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: barLabels,
          datasets: [{ data: barEmotions, label: "Emotions", backgroundColor: ["#CC1F36", "#638600", "#00655B", "#8F497B", "#D2B25B", "#F592E2"] }],
        },
        options: {
          maintainAspectRatio: false,
          tooltips: {
            enabled: true,
            mode: 'single',
            callbacks: {
              label: function (tooltipItem, data) {
                var allData: any[] = data.datasets[tooltipItem.datasetIndex].data;
                let sum = 0;
                let dataArr = data.datasets[0].data;
                dataArr.forEach(data => {
                  sum += data;
                });
                var tooltipLabel = data.labels[tooltipItem.index];
                var tooltipData: number = allData[tooltipItem.index];
                tooltipData = (tooltipData) * 100
                return tooltipLabel + ": " + (Math.round(tooltipData / sum)) + "%";
              }
            }
          }
        }
      })
    }
  }

  compare(a, b) {
    if (a.Date < b.Date) {
      return -1;
    }
    if (a.Date > b.Date) {
      return 1;
    }
    return 0;
  }

}