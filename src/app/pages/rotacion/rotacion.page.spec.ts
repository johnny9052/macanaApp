import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RotacionPage } from './rotacion.page';

describe('RotacionPage', () => {
  let component: RotacionPage;
  let fixture: ComponentFixture<RotacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RotacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
