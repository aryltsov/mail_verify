import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMethod1Component } from './verify-method1.component';

describe('VerifyMethod1Component', () => {
  let component: VerifyMethod1Component;
  let fixture: ComponentFixture<VerifyMethod1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyMethod1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMethod1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
