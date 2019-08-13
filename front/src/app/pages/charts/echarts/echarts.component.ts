import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {VerificationService} from '../../../providers/verification.service';
import {MongoService} from '../../../providers/mongo.service';
@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsComponent implements OnInit {
  emailVerivication: any;
  phoneVerofication: any;

  constructor(private mails: VerificationService, private mongoService: MongoService) {
  }

  ngOnInit() {
    this.mails.getVerificationData().subscribe(res => {
      let verified = 0;
      res.map(item => {
        if (item.verify) verified++;
      });
      const fake = res.length - verified;
      this.emailVerivication = [fake, verified];
    });
    this.mongoService.getDataFromBD('phone_verification', {}).subscribe(items => {
      let real = 0;
      let notReal = 0;
      items.response.map(res => {
        if (res.hasOwnProperty('verify') && res.verify) real++;
        if (res.hasOwnProperty('verify') && !res.verify) notReal++;
      });
      this.phoneVerofication = [notReal, real];
    });
    // this.phoneVerofication = [12, 125];
  }
}
