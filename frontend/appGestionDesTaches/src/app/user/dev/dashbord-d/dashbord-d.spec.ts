import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordD } from './dashbord-d';

describe('DashbordD', () => {
  let component: DashbordD;
  let fixture: ComponentFixture<DashbordD>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashbordD]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashbordD);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
