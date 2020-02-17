import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacasDetailPage } from './vacas-detail.page';

describe('VacasDetailPage', () => {
  let component: VacasDetailPage;
  let fixture: ComponentFixture<VacasDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacasDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacasDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
