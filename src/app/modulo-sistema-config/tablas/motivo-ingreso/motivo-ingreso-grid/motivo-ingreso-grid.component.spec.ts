import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoIngresoGridComponent } from './motivo-ingreso-grid.component';

describe('MotivoIngresoGridComponent', () => {
  let component: MotivoIngresoGridComponent;
  let fixture: ComponentFixture<MotivoIngresoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoIngresoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoIngresoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
