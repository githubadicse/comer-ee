import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivoSalidaMainComponent } from './motivo-salida-main.component';

describe('MotivoSalidaMainComponent', () => {
  let component: MotivoSalidaMainComponent;
  let fixture: ComponentFixture<MotivoSalidaMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotivoSalidaMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotivoSalidaMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
