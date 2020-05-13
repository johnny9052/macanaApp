import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RazaVacaDetailPage } from './raza-vaca-detail.page';

describe('RazaVacaDetailPage', () => {
  let component: RazaVacaDetailPage;
  let fixture: ComponentFixture<RazaVacaDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazaVacaDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RazaVacaDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
