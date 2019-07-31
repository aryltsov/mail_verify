import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-verify-method1',
  templateUrl: './verify-method1.component.html',
  styleUrls: ['./verify-method1.component.scss']
})
export class VerifyMethod1Component implements OnInit {

  alertIsOpen = false;
  message: string;
  constructor() { }

  ngOnInit() {
  }

  onCloseMessage() {
    this.alertIsOpen = false;
  }

  sendMessage() {
    this.message = 'A representative' + ' UserName ' + 'will be calling you withing 10 minutes. To ensure they`re legitimate, ask them for this code: ' + 'Code';
    this.alertIsOpen = true;
  }
}
