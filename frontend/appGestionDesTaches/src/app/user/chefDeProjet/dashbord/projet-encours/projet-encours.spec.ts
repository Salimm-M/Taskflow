import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetEncours } from './projet-encours';

describe('ProjetEncours', () => {
  let component: ProjetEncours;
  let fixture: ComponentFixture<ProjetEncours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjetEncours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjetEncours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
