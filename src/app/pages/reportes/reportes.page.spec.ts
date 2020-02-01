import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportesPage } from './reportes.page';

describe('ReportesPage', () => {
  let component: ReportesPage;
  let fixture: ComponentFixture<ReportesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
