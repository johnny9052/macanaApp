import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanDeManejoPage } from './plan-de-manejo.page';

describe('PlanDeManejoPage', () => {
  let component: PlanDeManejoPage;
  let fixture: ComponentFixture<PlanDeManejoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanDeManejoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanDeManejoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
