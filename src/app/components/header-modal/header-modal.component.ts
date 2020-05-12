import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-modal',
  templateUrl: './header-modal.component.html',
  styleUrls: ['./header-modal.component.scss'],
})
export class HeaderModalComponent implements OnInit {

  
  /*Recibe el titulo que se mostrara en la parte superior del formulario*/
  @Input() titulo: string;
  
  constructor() { }

  ngOnInit() {}

}
