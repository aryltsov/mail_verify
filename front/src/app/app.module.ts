import {APP_BASE_HREF} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from './@core/core.module';

import {LoginComponent} from './pages/login/login.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {ThemeModule} from './@theme/theme.module';
import {NbDialogModule} from '@nebular/theme';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DialogComponent} from './pages/verification/dialog/dialog.component';
import {HighlightModule} from 'ngx-highlightjs';
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

export function hljsLanguages() {
    return [
        {name: 'typescript', func: typescript},
        {name: 'scss', func: scss},
        {name: 'xml', func: xml}
    ];
}

@NgModule({
    declarations: [DialogComponent, AppComponent, LoginComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,

        NgbModule.forRoot(),
        NbDialogModule.forRoot(),
        ThemeModule.forRoot(),
        CoreModule.forRoot(),
        HighlightModule.forRoot({
            languages: hljsLanguages
        })
    ],
    bootstrap: [AppComponent, LoginComponent],
    providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
    ],
    entryComponents: [DialogComponent, LoginComponent]
})
export class AppModule {
}
