import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PotreroPage } from './potrero.page';

describe('PotreroPage', () => {
  let component: PotreroPage;
  let fixture: ComponentFixture<PotreroPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PotreroPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PotreroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
