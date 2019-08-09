import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor(private httpClient: HttpClient) {
  }

  sendMessageToUser(deviceId, message) {
      const URL = 'https://fcm.googleapis.com/fcm/send';
      const API_KEY = 'AIzaSyDjG-ovMTJ06PxgAJ0tAkke0LL0reKUuI4';
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'key=' + API_KEY
        })
      };
          return this.httpClient.post<any>(URL, {
            data: {
              title: 'Phone call verified',
              body: message,
            },
            registration_ids: deviceId,
            priority: 'high'
          }, httpOptions).pipe().subscribe(res => console.log(res));
  }
}


