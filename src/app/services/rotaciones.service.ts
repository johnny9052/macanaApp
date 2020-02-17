import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { HelperService } from '../util/HelperService';
import { TranslateService } from '@ngx-translate/core';
import { ModelRol } from '../interfaces/rolInterface';
import { ModelRotacion } from '../interfaces/rotacionInterface';

@Injectable({
  providedIn: 'root'
})
export class RotacionesService {

  baseUrl = environment.baseUrl;

  /*Definicion del header funcional para envios via post*/
  private headersPost = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  constructor(
    private http: HttpClient,
    public helperService: HelperService,
    private translate: TranslateService
  ) {}


  getRotaciones() {
    return this.http.get<ModelRotacion>(
      this.baseUrl + 'Controller/Rotaciones/CtlRotaciones.php?action=list'
    );
  }
}
