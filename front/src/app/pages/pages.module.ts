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
        VerifyMailComponent
    ],
    providers: [
        AuthGuardService
    ]
})
export class PagesModule {
}
