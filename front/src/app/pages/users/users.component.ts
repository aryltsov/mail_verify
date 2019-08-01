import {Component, OnInit} from '@angular/core';

import {UsersService} from '../../providers/users.service';

@Component({
    selector: 'ngx-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    settings = {
      // actions: {
      //   columnTitle: 'Actions',
      //   add: false,
      //   edit: false,
      //   delete: false,
      //   custom: [
      //     {name: 'show', title: '<i class="fa fa-xs fa-eye"></i>'}
      //   ],
      //   posve_ition: 'right'
      // },
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
        hideSubHeader: false, // hide filter row
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
