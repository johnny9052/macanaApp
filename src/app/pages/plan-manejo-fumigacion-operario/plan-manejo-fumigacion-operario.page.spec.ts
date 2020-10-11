import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionOperarioPage } from './plan-manejo-fumigacion-operario.page';

describe('PlanManejoFumigacionOperarioPage', () => {
  let component: PlanManejoFumigacionOperarioPage;
  let fixture: ComponentFixture<PlanManejoFumigacionOperarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFumigacionOperarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFumigacionOperarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
