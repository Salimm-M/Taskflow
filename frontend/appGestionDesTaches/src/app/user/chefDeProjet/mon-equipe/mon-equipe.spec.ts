import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonEquipe } from './mon-equipe';

describe('MonEquipe', () => {
  let component: MonEquipe;
  let fixture: ComponentFixture<MonEquipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonEquipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonEquipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
