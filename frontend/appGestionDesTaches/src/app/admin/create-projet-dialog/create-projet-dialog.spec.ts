import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjetDialog } from './create-projet-dialog';

describe('CreateProjetDialog', () => {
  let component: CreateProjetDialog;
  let fixture: ComponentFixture<CreateProjetDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjetDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjetDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
