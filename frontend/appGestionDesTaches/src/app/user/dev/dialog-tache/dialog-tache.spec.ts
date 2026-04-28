import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTache } from './dialog-tache';

describe('DialogTache', () => {
  let component: DialogTache;
  let fixture: ComponentFixture<DialogTache>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogTache]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTache);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
