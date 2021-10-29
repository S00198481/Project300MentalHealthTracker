import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnInit {

  recording:boolean = false;

  constructor(
    public service : VoiceRecognitionService
  ) { 
    this.service.init()
   }

  ngOnInit(): void {
  }

  buttonPress() {
    if(this.recording==true) {
      this.startService()
    }
    if(this.recording==false) {
      this.stopService()
    }
  }

  startService() {
    this.service.start()
  }

  stopService() {
    this.service.stop()
  }

  submitData() {

  }

}
