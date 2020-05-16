import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionPotreroGrupoPage } from './plan-manejo-fertilizacion-potrero-grupo.page';

describe('PlanManejoFertilizacionPotreroGrupoPage', () => {
  let component: PlanManejoFertilizacionPotreroGrupoPage;
  let fixture: ComponentFixture<PlanManejoFertilizacionPotreroGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFertilizacionPotreroGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFertilizacionPotreroGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
