import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabProjetDialogue } from './tab-projet-dialogue';

describe('TabProjetDialogue', () => {
  let component: TabProjetDialogue;
  let fixture: ComponentFixture<TabProjetDialogue>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabProjetDialogue]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabProjetDialogue);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
