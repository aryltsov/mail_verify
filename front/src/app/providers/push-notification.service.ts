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
      const API_KEY = 'AIzaSyDjG-ovMTJ06PxgAJ0tAkke0LL0reKUuI4';
      return this.httpClient.post<{ access_token: string }>(URL, {
        to: deviceId,
        data: message
      }, {
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': 'key=' + API_KEY
        },
  }).pipe(tap(res => {
        console.log(res);
      }));
  }
}
// function sendMessageToUser(deviceId, message) {
//   request({
//     url: 'https://fcm.googleapis.com/fcm/send',
//     method: 'POST',
//     headers: {
//       'Content-Type' :' application/json',
//       'Authorization': 'key=AI...8o'
//     },
//     body: JSON.stringify(
//       { "data": {
//           "message": message
//         },
//         "to" : deviceId
//       }
//     )
//   }, function(error, response, body) {
//     if (error) {
//       console.error(error, response, body);
//     }
//     else if (response.statusCode >= 400) {
//       console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body);
//     }
//     else {
//       console.log('Done!')
//     }
//   });
//
//   sendMessageToUser(
//     "d7x...KJQ",
//     { message: 'Hello puf'}
//   );
