import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFeedbackComponent } from './delete-feedback.component';

describe('DeleteFeedbackComponent', () => {
  let component: DeleteFeedbackComponent;
  let fixture: ComponentFixture<DeleteFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteFeedbackComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
