import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeIn } from './fade-in';

describe('FadeIn', () => {
  let component: FadeIn;
  let fixture: ComponentFixture<FadeIn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FadeIn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FadeIn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
