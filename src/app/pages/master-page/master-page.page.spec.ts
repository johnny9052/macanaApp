import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MasterPagePage } from './master-page.page';

describe('MasterPagePage', () => {
  let component: MasterPagePage;
  let fixture: ComponentFixture<MasterPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MasterPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
