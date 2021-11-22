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

  constructor(
    public voiceService: VoiceRecognitionService, public sentimentService: SentimentApiService, public AWSService: AWSService
  ) {
    this.voiceService.init()
  }

  ngOnInit(): void {
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
      this.AWSService.sendData(this.userText, this.emotion, this.sentiment);
     }, 10000);

  }

  processData() {
    this.userText = document.getElementById("text").textContent
    this.userText = this.userText.split(" ").join("%20");
    
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
