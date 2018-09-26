import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasEditComponent } from './compras-edit.component';

describe('ComprasEditComponent', () => {
  let component: ComprasEditComponent;
  let fixture: ComponentFixture<ComprasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
