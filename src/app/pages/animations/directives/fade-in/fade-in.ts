import { Directive, ElementRef, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { animate, AnimationBuilder, style } from '@angular/animations';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[fadeIn]',
})
export class FadeIn implements OnInit {
  element: ElementRef = inject(ElementRef);
  builder: AnimationBuilder = inject(AnimationBuilder);

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private _player: any = null;

  constructor() {
    if (this.isBrowser) {
      this._player = this.builder
        .build([style({ opacity: 0 }), animate('0.5s ease-in', style({ opacity: 1 }))])
        .create(this.element.nativeElement);
    }
  }

  ngOnInit(): void {
    if (this.isBrowser && this._player) {
      this._player.play();
    }
  }
}

// private _player = this.builder.build([
//     style({ opacity: 0 }),
//     animate('0.5s ease-in', style({ opacity: 1 })),
//   ])
//   .create(this.element.nativeElement);

//   ngOnInit(): void {
//     this._player.play()
//   }
