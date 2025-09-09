import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FadeInMore } from './fade-in-more';

describe('FadeInMore', () => {
  let component: FadeInMore;
  let fixture: ComponentFixture<FadeInMore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FadeInMore]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FadeInMore);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
