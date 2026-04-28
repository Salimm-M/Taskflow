import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrjetEnCours } from './prjet-en-cours';

describe('PrjetEnCours', () => {
  let component: PrjetEnCours;
  let fixture: ComponentFixture<PrjetEnCours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrjetEnCours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrjetEnCours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
