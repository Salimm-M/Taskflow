import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesTache } from './mes-tache';

describe('MesTache', () => {
  let component: MesTache;
  let fixture: ComponentFixture<MesTache>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesTache]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesTache);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
