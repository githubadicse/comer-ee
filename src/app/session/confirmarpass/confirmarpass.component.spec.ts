import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarpassComponent } from './confirmarpass.component';

describe('ConfirmarpassComponent', () => {
  let component: ConfirmarpassComponent;
  let fixture: ComponentFixture<ConfirmarpassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmarpassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarpassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
