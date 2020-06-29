import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FetilizanteDetailPage } from './fetilizante-detail.page';

describe('FetilizanteDetailPage', () => {
  let component: FetilizanteDetailPage;
  let fixture: ComponentFixture<FetilizanteDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetilizanteDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FetilizanteDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
