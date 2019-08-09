import { Injectable } from '@angular/core';
import {catchError, map, tap} from 'rxjs/operators';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MongoService {

  constructor() { }

  saveToBase(collectionName, data) {
    const URL = window.location.protocol + '//' + window.location.hostname;

    return ajax({
      url: URL + ':3000/phoneVerification/save',
      method: 'POST',
      body: data
    }).pipe(
      map(userResponse => {
        return userResponse.response;
      }),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      }),
    ).subscribe();
  }

  getMails(collectionName, data) {
    const URL = window.location.protocol + '//' + window.location.hostname;

    return ajax({
      url: URL + ':3000/phoneVerification/verified',
      method: 'POST',
      body: data
    }).subscribe();
  }
}
