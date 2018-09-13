import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenMainComponent } from './almacen-main.component';

describe('AlmacenMainComponent', () => {
  let component: AlmacenMainComponent;
  let fixture: ComponentFixture<AlmacenMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmacenMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmacenMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
