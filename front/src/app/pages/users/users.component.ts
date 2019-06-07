import {Component, OnInit} from '@angular/core';

import {UsersService} from '../../providers/users.service';

@Component({
    selector: 'ngx-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    settings = {
        columns: {
            _id: {
                title: 'ID'
            },
            email: {
                title: 'Email'
            },
            token: {
                title: 'Token'
            }
        },
        editable: false,
        actions: false, // hide action column
        hideSubHeader: true, // hide filter row
    };
    source: [];

    constructor(private usersService: UsersService) {
    }

    ngOnInit() {
        this.usersService
            .getUsersData()
            .subscribe((res) => {
                this.source = res;
            });
    }

}
