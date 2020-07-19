import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionDetailPage } from './plan-manejo-fumigacion-detail.page';

describe('PlanManejoFumigacionDetailPage', () => {
  let component: PlanManejoFumigacionDetailPage;
  let fixture: ComponentFixture<PlanManejoFumigacionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFumigacionDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFumigacionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
