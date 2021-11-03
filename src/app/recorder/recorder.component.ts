import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { SentimentApiService } from '../service/sentiment-api.service';
import { AWSService } from '../service/aws.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  recording: boolean = false;
  userText: string;
  emotion: any = {
    "emotions_detected": [
        "anger",
        "fear",
        "disgust",
        "sadness"
    ],
    "emotion_scores": {
        "anger": 0.08139157539877298,
        "fear": 0.07724855396303418,
        "disgust": 0.0565423309376263,
        "sadness": 0.05185282182503058,
        "surprise": 0.017367632925249947,
        "joy": 0
    },
    "thresholds": {
        "disgust": 0.05,
        "sadness": 0.05,
        "anger": 0.05,
        "joy": 0.05,
        "surprise": 0.05,
        "fear": 0.05
    },
    "version": "7.0.7",
    "author": "twinword inc.",
    "email": "help@twinword.com",
    "result_code": "200",
    "result_msg": "Success"
};
  sentiment: any = ({
    "type": "negative",
    "score": -0.393845528,
    "ratio": -0.7835246324260892,
    "keywords": [
        {
            "word": "very",
            "score": 0.192192596
        },
        {
            "word": "day",
            "score": 0.13424713
        },
        {
            "word": "bad",
            "score": -1.488950796
        },
        {
            "word": "sad",
            "score": -0.97837309
        },
        {
            "word": "have",
            "score": -0.162909152
        },
        {
            "word": "feeling",
            "score": -0.059279856
        }
    ],
    "version": "7.0.8",
    "author": "twinword inc.",
    "email": "help@twinword.com",
    "result_code": "200",
    "result_msg": "Success"
});
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
    /*this.userText = document.getElementById("text").textContent
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
    );*/

    this.emotion = JSON.stringify(this.emotion)
    this.sentiment = JSON.stringify(this.sentiment)

    this.AWSService.sendData("hello!", this.emotion, this.sentiment)
  }
}
