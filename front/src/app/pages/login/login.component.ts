import {Component, OnInit, ChangeDetectorRef, Inject} from '@angular/core';

import {NbAuthService, NbLoginComponent} from '@nebular/auth';
import {Router} from '@angular/router';
import {NB_AUTH_OPTIONS} from '@nebular/auth/auth.options';
import {AuthService} from '../../providers/auth.service';

@Component({
    selector: 'ngx-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends NbLoginComponent implements OnInit {

    constructor(
        service: NbAuthService,

        private authService: AuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        cd: ChangeDetectorRef, routes: Router
    ) {
        super(service, options, cd, routes);
    }

    ngOnInit() {
    }

    loginUser(email, pass) {
        this.authService
            .login(email, pass)
            .subscribe((res) => {
                console.log('----', res);
            });
    }
}
