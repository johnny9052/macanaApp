import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PresentacionPage } from './presentacion.page';

describe('PresentacionPage', () => {
  let component: PresentacionPage;
  let fixture: ComponentFixture<PresentacionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PresentacionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PresentacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
