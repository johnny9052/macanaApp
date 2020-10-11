import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActividadDetailPage } from './actividad-detail.page';

describe('ActividadDetailPage', () => {
  let component: ActividadDetailPage;
  let fixture: ComponentFixture<ActividadDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
