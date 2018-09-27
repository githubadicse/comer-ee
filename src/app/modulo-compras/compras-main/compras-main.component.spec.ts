import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasMainComponent } from './compras-main.component';

describe('ComprasMainComponent', () => {
  let component: ComprasMainComponent;
  let fixture: ComponentFixture<ComprasMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
