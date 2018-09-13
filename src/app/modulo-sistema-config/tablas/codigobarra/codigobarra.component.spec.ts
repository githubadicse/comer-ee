import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigobarraComponent } from './codigobarra.component';

describe('CodigobarraComponent', () => {
  let component: CodigobarraComponent;
  let fixture: ComponentFixture<CodigobarraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodigobarraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigobarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
