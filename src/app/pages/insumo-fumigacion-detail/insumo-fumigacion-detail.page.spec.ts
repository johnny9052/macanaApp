import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InsumoFumigacionDetailPage } from './insumo-fumigacion-detail.page';

describe('InsumoFumigacionDetailPage', () => {
  let component: InsumoFumigacionDetailPage;
  let fixture: ComponentFixture<InsumoFumigacionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsumoFumigacionDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InsumoFumigacionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
