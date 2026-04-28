import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEquipe } from './dialog-equipe';

describe('DialogEquipe', () => {
  let component: DialogEquipe;
  let fixture: ComponentFixture<DialogEquipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEquipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEquipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
