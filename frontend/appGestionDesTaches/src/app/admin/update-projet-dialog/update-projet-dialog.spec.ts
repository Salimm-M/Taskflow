import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProjetDialog } from './update-projet-dialog';

describe('UpdateProjetDialog', () => {
  let component: UpdateProjetDialog;
  let fixture: ComponentFixture<UpdateProjetDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProjetDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProjetDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
