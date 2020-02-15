import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstadoClimatologicoPage } from './estado-climatologico.page';

describe('EstadoClimatologicoPage', () => {
  let component: EstadoClimatologicoPage;
  let fixture: ComponentFixture<EstadoClimatologicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoClimatologicoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoClimatologicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
