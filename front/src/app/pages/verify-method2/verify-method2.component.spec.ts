import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyMethod2Component } from './verify-method2.component';

describe('VerifyMethod2Component', () => {
  let component: VerifyMethod2Component;
  let fixture: ComponentFixture<VerifyMethod2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyMethod2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyMethod2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
