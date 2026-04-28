import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesProjet } from './mes-projet';

describe('MesProjet', () => {
  let component: MesProjet;
  let fixture: ComponentFixture<MesProjet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesProjet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesProjet);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
