import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AforoDetailPage } from './aforo-detail.page';

describe('AforoDetailPage', () => {
  let component: AforoDetailPage;
  let fixture: ComponentFixture<AforoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AforoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AforoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
