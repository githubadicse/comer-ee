import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorclienteMainComponent } from './proveedorcliente-main.component';

describe('ProveedorclienteMainComponent', () => {
  let component: ProveedorclienteMainComponent;
  let fixture: ComponentFixture<ProveedorclienteMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedorclienteMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorclienteMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
