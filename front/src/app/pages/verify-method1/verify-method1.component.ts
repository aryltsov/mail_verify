import { Component, OnInit } from '@angular/core';
import { PushNotificationService } from '../../providers/push-notification.service';
import {ajax} from 'rxjs/ajax';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';
import {MongoService} from '../../providers/mongo.service';

@Component({
  selector: 'ngx-verify-method1',
  templateUrl: './verify-method1.component.html',
  styleUrls: ['./verify-method1.component.scss']
})
export class VerifyMethod1Component implements OnInit {

  alertIsOpen = false;
  message: string;
  constructor(private pushNotificationService: PushNotificationService,
              private mongoService: MongoService) { }

  ngOnInit() {
  }

  onCloseMessage() {
    this.alertIsOpen = false;
  }

  getUserData(userEmail) {
      const URL = window.location.protocol + '//' + window.location.hostname;
      return ajax({
        url: URL + ':3000/user_data',
        method: 'POST',
        body: {
          userEmail: userEmail
        }
      }).pipe(
        map(userResponse => {
          console.log('userResponse', userResponse);
          return userResponse.response;
        }),
        catchError(error => {
          console.log('error: ', error);
          return of(error);
        }),
      );
  }

  sendMessage(userEmail) {
    if (userEmail) {
      this.getUserData(userEmail).subscribe(item => {
        const code =  Math.random().toString(36).substring(2, 36);
        this.message = 'A representative ' + userEmail + ' will be calling you withing 10 minutes. To ensure they`re legitimate, ask them for this code:' + code;
        this.alertIsOpen = true;
        const tokens = [];
        item.map(mail => {
          tokens.push(mail.token);
        });
        this.pushNotificationService.sendMessageToUser(tokens, this.message);
        const data = {
                  email: userEmail,
                  date: new Date(),
                  user: localStorage.getItem('user_email'),
                  code: code
        };
        this.mongoService.saveToBase('phone_verification', data);
        // this.mongoService.getMails('phone_verification', {email: userEmail});
      });
    }
  }
}
