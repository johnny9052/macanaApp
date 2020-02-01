import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlagaPage } from './plaga.page';

describe('PlagaPage', () => {
  let component: PlagaPage;
  let fixture: ComponentFixture<PlagaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlagaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlagaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
