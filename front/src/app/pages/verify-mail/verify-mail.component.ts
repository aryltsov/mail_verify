import {Component, Input, OnInit} from '@angular/core';
import { UnverifiedService} from '../../providers/unverified.service';


@Component({
  selector: 'ngx-verify-mail',
  templateUrl: './verify-mail.component.html',
  styleUrls: ['./verify-mail.component.scss']
})
export class VerifyMailComponent implements OnInit {

  userEmail: string;

  constructor(public unverifiedService: UnverifiedService) { }

  sendEmail(value) {

      this.unverifiedService.sendUnverifiedMail(value).subscribe((res) => {
        this.userEmail = res;
      });

      alert('The message has been sent');
  }

  ngOnInit() {
  }

}
