import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FertilizantePage } from './fertilizante.page';

describe('FertilizantePage', () => {
  let component: FertilizantePage;
  let fixture: ComponentFixture<FertilizantePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FertilizantePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FertilizantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
