import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoSalidaEditComponent } from './motivo-salida-edit.component';

describe('MotivoSalidaEditComponent', () => {
  let component: MotivoSalidaEditComponent;
  let fixture: ComponentFixture<MotivoSalidaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoSalidaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoSalidaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
