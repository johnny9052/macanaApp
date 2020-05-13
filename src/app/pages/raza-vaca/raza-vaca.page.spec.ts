import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RazaVacaPage } from './raza-vaca.page';

describe('RazaVacaPage', () => {
  let component: RazaVacaPage;
  let fixture: ComponentFixture<RazaVacaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RazaVacaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RazaVacaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
