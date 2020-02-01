import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FertilizacionPage } from './fertilizacion.page';

describe('FertilizacionPage', () => {
  let component: FertilizacionPage;
  let fixture: ComponentFixture<FertilizacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FertilizacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FertilizacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
