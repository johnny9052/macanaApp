import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsumoFumigacionPage } from './insumo-fumigacion.page';

describe('InsumoFumigacionPage', () => {
  let component: InsumoFumigacionPage;
  let fixture: ComponentFixture<InsumoFumigacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoFumigacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsumoFumigacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
