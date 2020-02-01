import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PluviosidadPage } from './pluviosidad.page';

describe('PluviosidadPage', () => {
  let component: PluviosidadPage;
  let fixture: ComponentFixture<PluviosidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PluviosidadPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PluviosidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
