import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {VerificationService} from '../../../providers/verification.service';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsComponent implements OnInit {
  emailVerivication: any;
  phoneVerofication: any;
  constructor(private mails: VerificationService) {}
  ngOnInit() {
    this.mails.getVerificationData().subscribe(res => {
      let verified = 0;
      res.map(item => {
        if (item.verify) verified++;
      });
      const fake = res.length - verified;
      this.emailVerivication = [fake, verified];
    });
    this.phoneVerofication = [12, 125];
  }
}
