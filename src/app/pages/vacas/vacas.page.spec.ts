import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VacasPage } from './vacas.page';

describe('VacasPage', () => {
  let component: VacasPage;
  let fixture: ComponentFixture<VacasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VacasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
