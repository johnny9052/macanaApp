import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InfoMacanaPage } from './info-macana.page';

describe('InfoMacanaPage', () => {
  let component: InfoMacanaPage;
  let fixture: ComponentFixture<InfoMacanaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoMacanaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoMacanaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
