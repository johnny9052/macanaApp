import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActividadPage } from './actividad.page';

describe('ActividadPage', () => {
  let component: ActividadPage;
  let fixture: ComponentFixture<ActividadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
