import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPotreroPage } from './plan-manejo-fumigacion-potrero.page';

describe('PlanManejoFumigacionPotreroPage', () => {
  let component: PlanManejoFumigacionPotreroPage;
  let fixture: ComponentFixture<PlanManejoFumigacionPotreroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFumigacionPotreroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFumigacionPotreroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
