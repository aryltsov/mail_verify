import {Component, Input, Inject, OnInit} from '@angular/core';

import {NbMenuService, NbSidebarService, NB_WINDOW} from '@nebular/theme';
import {UserData} from '../../../@core/data/users';
import {AnalyticsService} from '../../../@core/utils';
import {LayoutService} from '../../../@core/utils';
import {AuthService} from '../../../providers/auth.service';
import {filter, map} from 'rxjs/operators';

@Component({
    selector: 'ngx-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

    @Input() position = 'normal';

    user: any;

    userMenu = [{title: 'Profile'}, {title: 'Log out'}];

    constructor(private sidebarService: NbSidebarService,
                private menuService: NbMenuService,

                private authService: AuthService,
                private userService: UserData,
                private analyticsService: AnalyticsService,
                private layoutService: LayoutService,
                private nbMenuService: NbMenuService,
                @Inject(NB_WINDOW) private window) {
    }

    ngOnInit() {
        this.user = {name: localStorage.getItem('user_email')};

        this.nbMenuService.onItemClick()
            .pipe(
                filter(({tag}) => tag === 'my-context-menu'),
                map(({item: {title}}) => title),
            )
            .subscribe(title => {
                if (title === 'Log out') {
                    this.logout();
                }
            });
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, 'menu-sidebar');
        this.layoutService.changeLayoutSize();

        return false;
    }

    logout() {
        this.authService.logout();
    }

    goToHome() {
        this.menuService.navigateHome();
    }

    startSearch() {
        this.analyticsService.trackEvent('startSearch');
    }
}
