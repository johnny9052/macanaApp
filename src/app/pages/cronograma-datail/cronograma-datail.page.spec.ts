import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CronogramaDatailPage } from './cronograma-datail.page';

describe('CronogramaDatailPage', () => {
  let component: CronogramaDatailPage;
  let fixture: ComponentFixture<CronogramaDatailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronogramaDatailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CronogramaDatailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
