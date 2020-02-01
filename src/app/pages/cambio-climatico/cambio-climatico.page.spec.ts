import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CambioClimaticoPage } from './cambio-climatico.page';

describe('CambioClimaticoPage', () => {
  let component: CambioClimaticoPage;
  let fixture: ComponentFixture<CambioClimaticoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioClimaticoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CambioClimaticoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
