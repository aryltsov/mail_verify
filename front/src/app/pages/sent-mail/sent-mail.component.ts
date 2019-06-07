import {Component, OnInit} from '@angular/core';

import {SentMailService} from '../../providers/sent-mail.service';

@Component({
    selector: 'ngx-sent-mail',
    templateUrl: './sent-mail.component.html',
    styleUrls: ['./sent-mail.component.scss'],
})
export class SentMailComponent implements OnInit {
    settings = {
        columns: {
            _id: {
                title: 'ID'
            },
            emailFrom: {
                title: 'Email From'
            },
            emailTo: {
                title: 'Email To'
            },
            subject: {
                title: 'Subject'
            },
            date: {
                title: 'Date',
                type: 'html',
                valuePrepareFunction: (d: string) => {
                    const date = new Date(d);
                    const year = date.getFullYear();
                    let month: any = date.getMonth() + 1;
                    let dt: any = date.getDate();

                    if (dt < 10) {
                        dt = '0' + dt;
                    }
                    if (month < 10) {
                        month = '0' + month;
                    }

                    return `<span>${year + '-' + month + '-' + dt}</span>`;
                }
            }
        },
        editable: false,
        actions: false, // hide action column
        hideSubHeader: true, // hide filter row
    };
    source: [];

    constructor(private sentMailService: SentMailService) {
    }

    ngOnInit() {
        this.sentMailService
            .getSentMailData()
            .subscribe((res) => {
                this.source = res;
            });
    }

}
