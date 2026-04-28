import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRefus } from './dialog-refus';

describe('DialogRefus', () => {
  let component: DialogRefus;
  let fixture: ComponentFixture<DialogRefus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRefus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogRefus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
