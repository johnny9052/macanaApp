import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LotePage } from './lote.page';

describe('LotePage', () => {
  let component: LotePage;
  let fixture: ComponentFixture<LotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
