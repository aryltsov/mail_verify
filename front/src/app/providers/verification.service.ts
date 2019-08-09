import {Injectable} from '@angular/core';
import {ajax} from 'rxjs/ajax';
import {map, catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class VerificationService {
    constructor(private httpClient: HttpClient) {
    }

    getVerificationData() {
      const URL = window.location.protocol + '//' + window.location.hostname;
        return ajax(URL + `:3000/get_mails`).pipe(
            map(mailResponse => {
                return mailResponse.response;
            }),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            }),
        );
    }

  phoneVerification(userEmail) {
        const URL = window.location.protocol + '//' + window.location.hostname;

        return this.httpClient.post<{ access_token: string }>(URL + ':3000/phoneVerification', {
          userEmail
        }).pipe(tap(res => {
          console.log(res);
        }));

  }

}
