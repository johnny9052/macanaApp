import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionFertilizantePage } from './plan-manejo-fertilizacion-fertilizante.page';

describe('PlanManejoFertilizacionFertilizantePage', () => {
  let component: PlanManejoFertilizacionFertilizantePage;
  let fixture: ComponentFixture<PlanManejoFertilizacionFertilizantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFertilizacionFertilizantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFertilizacionFertilizantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
