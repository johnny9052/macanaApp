import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CronogramaPage } from './cronograma.page';

describe('CronogramaPage', () => {
  let component: CronogramaPage;
  let fixture: ComponentFixture<CronogramaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CronogramaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CronogramaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
