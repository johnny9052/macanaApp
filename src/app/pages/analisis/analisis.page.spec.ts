import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnalisisPage } from './analisis.page';

describe('AnalisisPage', () => {
  let component: AnalisisPage;
  let fixture: ComponentFixture<AnalisisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalisisPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnalisisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
