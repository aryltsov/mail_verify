import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {Router} from '@angular/router';


@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private httpClient: HttpClient, private _router: Router) {
    }


    login(email: string, password: string) {
        return ajax({
            url: 'http://localhost:3000/login',
            method: 'POST',
            body: {
                email: email,
                password: password
            }
        }).pipe(
            map(userResponse => {
                console.log('userResponse', userResponse);

                if ((<any>userResponse).wrong_pass) {

                } else if (userResponse && userResponse.response && userResponse.response.length && userResponse.response[0]._id) {
                    localStorage.setItem('access_token', userResponse.response[0]._id);
                    localStorage.setItem('user_email', userResponse.response[0].email);
                    this._router.navigate(['/page/verify_mail']);
                }

                return userResponse.response;
            }),
            catchError(error => {
                console.log('error: ', error);
                return of(error);
            }),
        );
    }

    register(email: string, password: string) {
        return this.httpClient.post<{ access_token: string }>('http://localhost:3000/register', {
            email,
            password
        }).pipe(tap(res => {
            this.login(email, password);
        }));
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_email');

        this._router.navigate(['/auth/login']);
    }

    isAuthenticated(): boolean {
        return localStorage.getItem('access_token') !== null;
    }
}
