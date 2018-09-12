import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FechaMatComponent } from './fecha-mat.component';

describe('FechaMatComponent', () => {
  let component: FechaMatComponent;
  let fixture: ComponentFixture<FechaMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FechaMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
