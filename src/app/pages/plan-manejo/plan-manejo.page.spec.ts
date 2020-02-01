import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoPage } from './plan-manejo.page';

describe('PlanManejoPage', () => {
  let component: PlanManejoPage;
  let fixture: ComponentFixture<PlanManejoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
