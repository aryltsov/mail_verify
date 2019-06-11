import {Component, OnInit, ChangeDetectorRef, Inject} from '@angular/core';

import {NbToastrService} from '@nebular/theme';
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
        private toastrService: NbToastrService,
        private authService: AuthService,
        @Inject(NB_AUTH_OPTIONS) protected options = {},
        cd: ChangeDetectorRef, routes: Router
    ) {
        super(service, options, cd, routes);
    }

    ngOnInit() {
    }

    msToTime(duration) {
        let seconds: any = Math.floor((duration / 1000) % 60),
            minutes: any = Math.floor((duration / (1000 * 60)) % 60),
            hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

        hours = (hours < 10) ? '0' + hours : hours;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;

        return hours + ':' + minutes + ':' + seconds;
    }

    loginUser(email, pass) {
        this.authService
            .login(email, pass)
            .subscribe((res) => {
                if (res.wrong_pass) {
                    let mess,
                        title = 'Wrong Password';

                    if (res.wrong_pass.wrong_pass === 1)
                        mess = 'You entered the wrong password 1 time. After 3 you will be banned';

                    if (res.wrong_pass.wrong_pass === 2)
                        mess = 'You entered the wrong password 2 times. After 3 you will be banned';

                    if (res.wrong_pass.wrong_pass >= 3)
                        mess = 'You entered the wrong password 3 times. You were banned';

                    if (res.wrong_pass.banned_to !== '') {
                        const time = new Date(res.wrong_pass.banned_to).getTime() - new Date().getTime();
                        mess = 'You will be unbanned in ' + this.msToTime(time);
                        title = 'You were banned.';
                    }

                    this.showToast('top-left', 'danger', mess, title);
                }
            });
    }

    showToast(position, status, mess, title) {
        this.toastrService.show(
            mess,
            title,
            {
                duration: 5000,
                position: position,
                status: status
            }
        );
    }
}
