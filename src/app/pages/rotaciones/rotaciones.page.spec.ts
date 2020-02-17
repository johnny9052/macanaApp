import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RotacionesPage } from './rotaciones.page';

describe('RotacionesPage', () => {
  let component: RotacionesPage;
  let fixture: ComponentFixture<RotacionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotacionesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RotacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
