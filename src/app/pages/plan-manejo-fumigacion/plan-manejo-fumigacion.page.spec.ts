import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPage } from './plan-manejo-fumigacion.page';

describe('PlanManejoFumigacionPage', () => {
  let component: PlanManejoFumigacionPage;
  let fixture: ComponentFixture<PlanManejoFumigacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFumigacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFumigacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
