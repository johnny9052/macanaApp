import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EstadoClimatologicoDetailPage } from './estado-climatologico-detail.page';

describe('EstadoClimatologicoDetailPage', () => {
  let component: EstadoClimatologicoDetailPage;
  let fixture: ComponentFixture<EstadoClimatologicoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadoClimatologicoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EstadoClimatologicoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
