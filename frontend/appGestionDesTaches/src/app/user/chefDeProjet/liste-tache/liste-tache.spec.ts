import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeTache } from './liste-tache';

describe('ListeTache', () => {
  let component: ListeTache;
  let fixture: ComponentFixture<ListeTache>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeTache]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeTache);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
