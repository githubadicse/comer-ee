import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductodetalleComponent } from './productodetalle.component';

describe('ProductodetalleComponent', () => {
  let component: ProductodetalleComponent;
  let fixture: ComponentFixture<ProductodetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductodetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductodetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
