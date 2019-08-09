import {Component, OnInit} from '@angular/core';

import {UsersService} from '../../providers/users.service';
import {ExportService} from '../../providers/export.service';

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

    constructor(private usersService: UsersService, private exportService: ExportService) {
    }

    ngOnInit() {
        this.usersService
            .getUsersData('get_users')
            .subscribe((res) => {
                this.source = res;
            });
    }

  export(data) {
    this.exportService.downloadFile(data.grid.source.filteredAndSorted, 'Users');
  }
}
