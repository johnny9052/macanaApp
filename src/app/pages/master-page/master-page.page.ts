import { Component, OnInit } from '@angular/core';
import { BlockAccessService } from 'src/app/util/blockAccess';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.page.html',
  styleUrls: ['./master-page.page.scss'],
})
export class MasterPagePage implements OnInit {

  constructor(private blockAccess: BlockAccessService) { }

  ngOnInit() {
  }

}
