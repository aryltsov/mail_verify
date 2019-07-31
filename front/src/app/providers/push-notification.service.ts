import { Injectable } from '@angular/core';
import {request} from 'http';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private httpClient: HttpClient) {
  }

  sendMessageToUser(deviceId, message) {
      const URL = 'https://fcm.googleapis.com/fcm/send';
      return this.httpClient.post<{ access_token: string }>(URL, {
        to: deviceId,
        data: message
      }).pipe(tap(res => {
        console.log(res);
      }));
  }
}
