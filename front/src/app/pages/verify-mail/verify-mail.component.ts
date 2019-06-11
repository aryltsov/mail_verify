import {Component, Input, OnInit} from '@angular/core';
import { UnverifiedService} from '../../providers/unverified.service';
import { NbToastrService } from '@nebular/theme';



@Component({
  selector: 'ngx-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit {

  userEmail: string;

  constructor(public unverifiedService: UnverifiedService, private toastrService: NbToastrService) { }

  sendUnverifiedEmail(value) {

      this.unverifiedService.sendUnverifiedMail(value).subscribe((res) => {
        this.userEmail = res;
      });

      const message = 'The message has been sent';

      this.showToast('top-left', 'success', message, '');
  }
  sendVerifiedEmail(value) {

    this.unverifiedService.sendVerifiedMail(value).subscribe((res) => {
      this.userEmail = res;
    });

    const message = 'The message has been sent';

    this.showToast('top-left', 'success', message, '');

  }

  ngOnInit() {
  }

  showToast(position, status, mess, title) {
    this.toastrService.show(
      mess,
      title,
      {
        duration: 5000,
        position: position,
        status: status
      }
    );
  }

}
