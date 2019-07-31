import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ECommerceComponent} from './e-commerce/e-commerce.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';
import {UsersComponent} from './users/users.component';
import {SentMailComponent} from './sent-mail/sent-mail.component';
import {VerificationComponent} from './verification/verification.component';
import {VerifyMailComponent} from './verify-mail/verify-mail.component';
import {AuthGuardService} from '../guards/auth-guard.service';
import {VerifyMethod1Component} from './verify-method1/verify-method1.component';
import {VerifyMethod2Component} from './verify-method2/verify-method2.component';

const routes: Routes = [{
    canActivate: [AuthGuardService],
    path: '',
    component: PagesComponent,
    children: [{
        path: 'dashboard',
        component: ECommerceComponent,
    }, {
        path: 'verify_mail',
        component: VerifyMailComponent,
    }, {
        path: 'iot-dashboard',
        component: DashboardComponent,
    }, {
        path: 'users',
        component: UsersComponent,
    }, {
        path: 'sent_mail',
        component: SentMailComponent,
    }, {
        path: 'verification',
        component: VerificationComponent,
    },  {
        path: 'verify-method1',
        component: VerifyMethod1Component
    },  {
      path: 'verify-method2',
      component: VerifyMethod2Component
    }, {
        path: 'ui-features',
        loadChildren: './ui-features/ui-features.module#UiFeaturesModule',
    }, {
        path: 'modal-overlays',
        loadChildren: './modal-overlays/modal-overlays.module#ModalOverlaysModule',
    }, {
        path: 'extra-components',
        loadChildren: './extra-components/extra-components.module#ExtraComponentsModule',
    }, {
        path: 'bootstrap',
        loadChildren: './bootstrap/bootstrap.module#BootstrapModule',
    }, {
        path: 'maps',
        loadChildren: './maps/maps.module#MapsModule',
    }, {
        path: 'charts',
        loadChildren: './charts/charts.module#ChartsModule',
    }, {
        path: 'editors',
        loadChildren: './editors/editors.module#EditorsModule',
    }, {
        path: 'forms',
        loadChildren: './forms/forms.module#FormsModule',
    }, {
        path: 'tables',
        loadChildren: './tables/tables.module#TablesModule',
    }, {
        path: 'miscellaneous',
        loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
    }, {
        path: '',
        redirectTo: 'charts/echarts',
        pathMatch: 'full',
    }, {
        path: '**',
        component: NotFoundComponent,
    }],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {
}
