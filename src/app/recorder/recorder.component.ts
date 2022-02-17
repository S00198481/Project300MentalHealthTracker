import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { SentimentApiService } from '../service/sentiment-api.service';
import { AWSService } from '../service/aws.service';
import { waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  recording: boolean = false;
  userText: string;
  emotion: any;
  sentiment: any;
  errorMessage: any;
  activity: string[] = new Array();
  activityJSON: any;

  constructor(
    public voiceService: VoiceRecognitionService, public sentimentService: SentimentApiService, public AWSService: AWSService
  ) {
    this.voiceService.init()
  }

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
        this.activity.push("Drinks");
        console.log(this.activity)
        break;
      default:
        console.log("No activity undertaken.");
        console.log(this.activity)
        break;
    }
  }
  
  checkData() {
    console.log(this.activityJSON)
  }

  buttonPress() {
    if (this.recording == true) {
      this.startService()
    }
    if (this.recording == false) {
      this.stopService()
    }
  }

  startService() {
    this.voiceService.start()
  }

  stopService() {
    this.voiceService.stop()
  }

  submitData() {
    this.processData();
    setTimeout(() => {
      this.userText = this.userText.split("%20").join(" ");
      this.emotion = JSON.stringify(this.emotion)
      this.sentiment = JSON.stringify(this.sentiment)
      this.activityJSON = JSON.stringify(this.activity)
      this.AWSService.sendData(this.userText, this.emotion, this.sentiment, this.activityJSON);
     }, 10000);
  }

  processData() {
    if (document.getElementById("text").textContent != null) {
    this.userText = document.getElementById("text").textContent
    this.userText = this.userText.split(" ").join("%20");
    } 

    var textArea = document.getElementById("text2") as HTMLInputElement

    if (textArea.value != null) {
    this.userText = textArea.value
    this.userText = this.userText.split(" ").join("%20");
    }

    console.log(this.userText)
    
  this.sentimentService.getEmotion(this.userText).subscribe(
      emotion => {
        this.emotion = emotion;
      },
      error => this.errorMessage = <any>error
    );

    this.sentimentService.getSentiment(this.userText).subscribe(
      sentiment => {
        this.sentiment = sentiment;
      },
      error => this.errorMessage = <any>error
    );

    this.emotion = JSON.stringify(this.emotion)
    this.sentiment = JSON.stringify(this.sentiment)
  }

}
