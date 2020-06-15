import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionOperarioPage } from './plan-manejo-fertilizacion-operario.page';

describe('PlanManejoFertilizacionOperarioPage', () => {
  let component: PlanManejoFertilizacionOperarioPage;
  let fixture: ComponentFixture<PlanManejoFertilizacionOperarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFertilizacionOperarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFertilizacionOperarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
