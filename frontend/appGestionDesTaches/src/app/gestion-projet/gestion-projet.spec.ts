import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionProjet } from './gestion-projet';

describe('GestionProjet', () => {
  let component: GestionProjet;
  let fixture: ComponentFixture<GestionProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
