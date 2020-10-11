import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanManejoFumigacionPotreroGrupoPage } from './plan-manejo-fumigacion-potrero-grupo.page';

describe('PlanManejoFumigacionPotreroGrupoPage', () => {
  let component: PlanManejoFumigacionPotreroGrupoPage;
  let fixture: ComponentFixture<PlanManejoFumigacionPotreroGrupoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanManejoFumigacionPotreroGrupoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanManejoFumigacionPotreroGrupoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
