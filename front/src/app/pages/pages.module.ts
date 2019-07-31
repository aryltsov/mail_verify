import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {ECommerceModule} from './e-commerce/e-commerce.module';
import {PagesRoutingModule} from './pages-routing.module';
import {ThemeModule} from '../@theme/theme.module';
import {MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import {UsersComponent} from './users/users.component';
import {SentMailComponent} from './sent-mail/sent-mail.component';
import {VerificationComponent} from './verification/verification.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {VerifyMailComponent} from './verify-mail/verify-mail.component';
import {AuthGuardService} from '../guards/auth-guard.service';
import {VerifyMethod1Component} from './verify-method1/verify-method1.component';
import { VerifyMethod2Component } from './verify-method2/verify-method2.component';

const PAGES_COMPONENTS = [
    PagesComponent,
];

@NgModule({
    imports: [
        PagesRoutingModule,
        ThemeModule,
        DashboardModule,
        ECommerceModule,
        MiscellaneousModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        ...PAGES_COMPONENTS,
        UsersComponent,
        SentMailComponent,
        VerificationComponent,
        VerifyMailComponent,
        VerifyMethod1Component,
        VerifyMethod2Component
    ],
    providers: [
        AuthGuardService
    ]
})
export class PagesModule {
}
