import { Component, OnInit } from '@angular/core';
import { ModelAforo } from 'src/app/interfaces/aforoInterface';
import { BlockAccessService } from 'src/app/util/blockAccess';
import { HelperService } from 'src/app/util/HelperService';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AforoService } from 'src/app/services/aforo.service';

@Component({
  selector: 'app-aforo-detail',
  templateUrl: './aforo-detail.page.html',
  styleUrls: ['./aforo-detail.page.scss'],
})
export class AforoDetailPage implements OnInit {
 
  ngOnInit() {
    
  }
}
