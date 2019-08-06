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
            title: 'Verify',
            body: message
          },
          registration_ids: [
            // deviceId
            'eLc8U885uEM:APA91bEvH5gUyywY21sNlMLEYG-tY0n5boa_flsvgheQ9U4KsS7GMFz4t4OqcWiErYHjIWpjABY-pduAPsCDfwqy1WMlvjitorWgCg_A1N4jKnb132Jfw4BA2hh2wjNsFZLP1rrugBkp'
          ],
          priority: 'high'
        }, httpOptions).pipe().subscribe(res => console.log(res));
      }
}


