import { Directive, ElementRef, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[wobble]',
})
export class Wobble {
  element: ElementRef = inject(ElementRef);
  builder: AnimationBuilder = inject(AnimationBuilder);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _player: any = null;

  constructor() {
    // Solo crear la animación si estamos en el navegador
    if (this.isBrowser) {
      this._player = this.builder
        .build([
          style({ transform: 'translateX(0)' }),
          animate('300ms', style({ transform: 'translateX(-5px)' })),
          animate('300ms', style({ transform: 'translateX(5px)' })),
          animate('300ms', style({ transform: 'translateX(-5px)' })),
          animate('300ms', style({ transform: 'translateX(5px)' })),
          animate('300ms', style({ transform: 'translateX(0)' })),
        ])
        .create(this.element.nativeElement);
    }
  }

  private playAnimation() {
    if (!this.isBrowser || !this._player) return;

    this._player.play();
    this._player.onDone(() => {
      this._player.reset();
      this._player.play();
    });
  }

  private stopAnimation() {
    if (!this.isBrowser || !this._player) return;

    this._player.pause();
    this._player.reset();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.playAnimation();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.stopAnimation();
  }
}