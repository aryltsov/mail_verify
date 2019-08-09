import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../providers/users.service';
import {ExportService} from '../../providers/export.service';

@Component({
  selector: 'ngx-verify-method2',
  templateUrl: './verify-method2.component.html',
  styleUrls: ['./verify-method2.component.scss']
})
export class VerifyMethod2Component implements OnInit {
  settings = {
    // },
    columns: {
      email: {
        title: 'email'
      },
      date: {
        title: 'Date'
      },
      user: {
        title: 'User'
      },
      code: {
        title: 'Code'
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
      .getUsersData('phoneVerification')
      .subscribe((res) => {
        this.source = res;
      });
  }

  export(data) {
    this.exportService.downloadFile(data.grid.source.filteredAndSorted, 'Users');
  }
}
