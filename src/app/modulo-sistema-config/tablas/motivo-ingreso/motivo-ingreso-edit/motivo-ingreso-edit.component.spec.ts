import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoIngresoEditComponent } from './motivo-ingreso-edit.component';

describe('MotivoIngresoEditComponent', () => {
  let component: MotivoIngresoEditComponent;
  let fixture: ComponentFixture<MotivoIngresoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoIngresoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoIngresoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
