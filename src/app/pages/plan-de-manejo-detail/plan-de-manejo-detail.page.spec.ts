import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanDeManejoDetailPage } from './plan-de-manejo-detail.page';

describe('PlanDeManejoDetailPage', () => {
  let component: PlanDeManejoDetailPage;
  let fixture: ComponentFixture<PlanDeManejoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDeManejoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanDeManejoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
