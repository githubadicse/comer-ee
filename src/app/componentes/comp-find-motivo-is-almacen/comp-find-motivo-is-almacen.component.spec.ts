import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompFindMotivoIsAlmacenComponent } from './comp-find-motivo-is-almacen.component';

describe('CompFindMotivoIsAlmacenComponent', () => {
  let component: CompFindMotivoIsAlmacenComponent;
  let fixture: ComponentFixture<CompFindMotivoIsAlmacenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompFindMotivoIsAlmacenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompFindMotivoIsAlmacenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
