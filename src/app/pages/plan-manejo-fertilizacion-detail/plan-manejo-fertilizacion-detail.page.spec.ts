import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFertilizacionDetailPage } from './plan-manejo-fertilizacion-detail.page';

describe('PlanManejoFertilizacionDetailPage', () => {
  let component: PlanManejoFertilizacionDetailPage;
  let fixture: ComponentFixture<PlanManejoFertilizacionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFertilizacionDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFertilizacionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
