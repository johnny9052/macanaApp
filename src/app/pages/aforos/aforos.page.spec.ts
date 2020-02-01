import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AforosPage } from './aforos.page';

describe('AforosPage', () => {
  let component: AforosPage;
  let fixture: ComponentFixture<AforosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AforosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AforosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
