import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wobble } from './wobble';

describe('Wobble', () => {
  let component: Wobble;
  let fixture: ComponentFixture<Wobble>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wobble]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wobble);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
