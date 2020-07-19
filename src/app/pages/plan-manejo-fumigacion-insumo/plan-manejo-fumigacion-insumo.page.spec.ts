import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionInsumoPage } from './plan-manejo-fumigacion-insumo.page';

describe('PlanManejoFumigacionInsumoPage', () => {
  let component: PlanManejoFumigacionInsumoPage;
  let fixture: ComponentFixture<PlanManejoFumigacionInsumoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFumigacionInsumoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFumigacionInsumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
