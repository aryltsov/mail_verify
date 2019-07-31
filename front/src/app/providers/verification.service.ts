import {Injectable} from '@angular/core';
import {ajax} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class VerificationService {
    constructor() {
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

}
