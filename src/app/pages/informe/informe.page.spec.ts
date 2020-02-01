import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformePage } from './informe.page';

describe('InformePage', () => {
  let component: InformePage;
  let fixture: ComponentFixture<InformePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InformePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
