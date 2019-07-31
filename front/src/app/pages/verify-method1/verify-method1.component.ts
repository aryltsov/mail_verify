import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../providers/push-notification.service';

@Component({
  selector: 'ngx-verify-method1',
  templateUrl: './verify-method1.component.html',
  styleUrls: ['./verify-method1.component.scss']
})
export class VerifyMethod1Component implements OnInit {

  alertIsOpen = false;
  message: string;
  constructor(private pushNotificationService: PushNotificationService) { }

  ngOnInit() {
  }

  onCloseMessage() {
    this.alertIsOpen = false;
  }

  sendMessage(id) {
    if (id) {
      const code = '---';
      this.message = 'A representative' + ' UserName ' + 'will be calling you withing 10 minutes. To ensure they`re legitimate, ask them for this code: ' + code;
      this.alertIsOpen = true;
      this.pushNotificationService.sendMessageToUser(id, code);
    }
  }
}
