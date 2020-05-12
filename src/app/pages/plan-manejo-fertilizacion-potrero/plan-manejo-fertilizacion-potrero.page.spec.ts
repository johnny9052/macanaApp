import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionPotreroPage } from './plan-manejo-fertilizacion-potrero.page';

describe('PlanManejoFertilizacionPotreroPage', () => {
  let component: PlanManejoFertilizacionPotreroPage;
  let fixture: ComponentFixture<PlanManejoFertilizacionPotreroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFertilizacionPotreroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFertilizacionPotreroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
