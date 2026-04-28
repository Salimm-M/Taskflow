import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeTache } from './gestion-de-tache';

describe('GestionDeTache', () => {
  let component: GestionDeTache;
  let fixture: ComponentFixture<GestionDeTache>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionDeTache]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionDeTache);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
