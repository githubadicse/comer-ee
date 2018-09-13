import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompletComponent } from './autocomplet.component';

describe('AutocompletComponent', () => {
  let component: AutocompletComponent;
  let fixture: ComponentFixture<AutocompletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
