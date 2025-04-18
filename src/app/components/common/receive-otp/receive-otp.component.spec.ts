import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveOtpComponent } from './receive-otp.component';

describe('ReceiveOtpComponent', () => {
  let component: ReceiveOtpComponent;
  let fixture: ComponentFixture<ReceiveOtpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceiveOtpComponent]
    });
    fixture = TestBed.createComponent(ReceiveOtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
