import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RotacionesDetailPage } from './rotaciones-detail.page';

describe('RotacionesDetailPage', () => {
  let component: RotacionesDetailPage;
  let fixture: ComponentFixture<RotacionesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotacionesDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RotacionesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
