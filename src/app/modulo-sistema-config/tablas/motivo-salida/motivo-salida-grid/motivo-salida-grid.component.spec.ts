import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoSalidaGridComponent } from './motivo-salida-grid.component';

describe('MotivoSalidaGridComponent', () => {
  let component: MotivoSalidaGridComponent;
  let fixture: ComponentFixture<MotivoSalidaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoSalidaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoSalidaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
