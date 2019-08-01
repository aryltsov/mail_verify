import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ajax} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UnverifiedService {

  constructor(private http: HttpClient) {
  }

  sendUnverifiedMail(userEmail) {

    const body = {email: userEmail};
    const URL = window.location.protocol + '//' + window.location.hostname;
    return ajax({
      url: URL + ':3000/send_unverified',
      method: 'POST',
      body: body
    }).pipe(
            map(mailResponse => {
            return body;
    }),
      catchError(error => {
            console.log('error: ', error);
            return of(error);
      }),
    );
  }
  sendVerifiedMail(userEmail) {

    const body = {email: userEmail};
    const URL = window.location.protocol + '//' + window.location.hostname;
    return ajax({
      url: URL + ':3000/send_verified',
      method: 'POST',
      body: body
    }).pipe(
      map(mailResponse => {
        return body;
      }),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      }),
    );
  }


}
