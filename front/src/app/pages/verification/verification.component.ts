import {Component, OnInit} from '@angular/core';
import {VerificationService} from '../../providers/verification.service';
import {NbDialogService} from '@nebular/theme';
import {DialogComponent} from './dialog/dialog.component';

@Component({
    selector: 'ngx-verification',
    templateUrl: './verification.component.html',
    styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements OnInit {

    settings = {
        actions: {
            columnTitle: 'Actions',
            add: false,
            edit: false,
            delete: false,
            custom: [
                {name: 'show', title: '<i class="fa fa-xs fa-eye"></i>'}
            ],
            posve_ition: 'right'
        },
        columns: {
            sid: {
                title: 'SID',
                type: 'html',
                valuePrepareFunction: (sid: string) => {
                    if (sid)
                        return `<span>${sid}</span>`;
                    else
                        return `<span>No SID</span>`;
                }
            },
            emailTo: {
                title: 'To'
            },
            emailFrom: {
                title: 'From'
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
            },
            verify: {
                title: 'Verify',
                type: 'html',
                valuePrepareFunction: (verify: boolean) => {
                    if (!verify)
                        return `<i class="nb-close"></i>`;
                    else
                        return `<i class="nb-checkmark"></i>`;
                },
            },
            reasons: {
                title: 'reasons'
            }
        },
        editable: false,
        hideSubHeader: false,  // hide filter row
    };
    source: [];

    constructor(private verificationService: VerificationService, private dialogService: NbDialogService) {
    }

    ngOnInit() {
        this.verificationService
            .getVerificationData()
            .subscribe((res) => {
                this.source = res;
            });
    }

    show(event) {
        this.dialogService.open(DialogComponent, {
            hasBackdrop: true,
            closeOnBackdropClick: true,
            hasScroll: false,
            context: event.data
        });
    }

}
