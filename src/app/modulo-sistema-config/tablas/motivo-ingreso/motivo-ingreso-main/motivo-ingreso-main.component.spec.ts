import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoIngresoMainComponent } from './motivo-ingreso-main.component';

describe('MotivoIngresoMainComponent', () => {
  let component: MotivoIngresoMainComponent;
  let fixture: ComponentFixture<MotivoIngresoMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoIngresoMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoIngresoMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
