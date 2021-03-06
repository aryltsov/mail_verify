import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ajax} from 'rxjs/ajax';
import {map, catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UsersService {

    constructor(private http: HttpClient) {
    }

    getUsersData(req) {
      const URL = window.location.protocol + '//' + window.location.hostname;
        return ajax(URL + ':3000/' + req).pipe(
            map(userResponse => {
                console.log('users: ', userResponse);
                return userResponse.response;
            }),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            }),
        );
    }

}
