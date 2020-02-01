import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PermisosPage } from './permisos.page';

describe('PermisosPage', () => {
  let component: PermisosPage;
  let fixture: ComponentFixture<PermisosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermisosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PermisosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
