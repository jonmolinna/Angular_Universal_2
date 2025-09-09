import { animate, AnimationBuilder, style } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';
import { Directive, ElementRef, inject, Input, OnInit, PLATFORM_ID } from '@angular/core';

@Directive({
  selector: '[fadeInMore]',
})
export class FadeInMore implements OnInit {
  @Input() duration: string = '0.5s';
  @Input() delay: string = '0s';
  @Input() easing: string = 'ease-in';

  element: ElementRef = inject(ElementRef);
  builder: AnimationBuilder = inject(AnimationBuilder);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _player: any = null;

  constructor() {
    if (this.isBrowser) {
      this._player = this.builder
        .build([
          style({ opacity: 0 }),
          animate(`${this.duration} ${this.easing}`, style({ opacity: 1 })),
        ])
        .create(this.element.nativeElement);
    }
  }

  ngOnInit(): void {
    if (this.isBrowser && this._player) {
      this._player.play();
    }
  }
}
