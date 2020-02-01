import { Component, OnInit } from '@angular/core';
import { ModelUserLogIn } from 'src/app/interfaces/userInterface';
import { HelperService } from 'src/app/util/HelperService';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss']
})
export class LogInPage implements OnInit {
  userDataLogIn = {} as ModelUserLogIn;

  constructor(
    private securityService: SecurityService,
    public helperService: HelperService
  ) {}

  ngOnInit() {
    this.userDataLogIn.username = '';
    this.userDataLogIn.password = '';
  }

  identify() {
    this.securityService.logInUser(this.userDataLogIn);
  }

  openPage(url: string) {
    if (url !== 'undefined' && url !== undefined && url !== null) {
      this.helperService.abrirUrlExterna(url);
    }
  }
}
