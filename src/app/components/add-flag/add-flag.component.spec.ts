import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFlagComponent } from './add-flag.component';

describe('AddFlagComponent', () => {
  let component: AddFlagComponent;
  let fixture: ComponentFixture<AddFlagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFlagComponent]
    });
    fixture = TestBed.createComponent(AddFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
