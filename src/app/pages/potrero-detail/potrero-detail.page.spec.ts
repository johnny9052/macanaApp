import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PotreroDetailPage } from './potrero-detail.page';

describe('PotreroDetailPage', () => {
  let component: PotreroDetailPage;
  let fixture: ComponentFixture<PotreroDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotreroDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PotreroDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
