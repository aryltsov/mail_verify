import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(private dialogService: NbDialogService) { }

  ngOnInit() {
  }

}
