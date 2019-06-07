import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ajax} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SentMailService {

    constructor(private http: HttpClient) {
    }

    getSentMailData() {
        return ajax(`http://localhost:3000/get_mails/get_sent_mail`).pipe(
            map(mailResponse => {
                console.log('mail: ', mailResponse);
                return mailResponse.response;
            }),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            }),
        );
    }

}
