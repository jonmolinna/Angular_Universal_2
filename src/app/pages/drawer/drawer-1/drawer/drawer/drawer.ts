import { isPlatformBrowser } from '@angular/common';
import { Component, computed, EventEmitter, inject, input, Input, Output, PLATFORM_ID, signal, Signal, WritableSignal } from '@angular/core';
import { DRAWER_POSITION, DRAWER_SIZE } from '../model/drawer.model';

@Component({
  selector: 'app-drawer',
  imports: [],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css'
})
export class Drawer {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Configuration Inputs
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() position: DRAWER_POSITION = 'right';
  @Input() size: DRAWER_SIZE = 'md';

  // Behavior Inputs
  @Input() closeOnBackdrop: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() showDefaultActions: boolean = false;
  @Input() preventBodyScroll: boolean = true;

  // Layout Inputs
  @Input() hideHeader: boolean = false;
  @Input() hideFooter: boolean = false;

  // Button texts
  @Input() confirmText: string = 'Guardar';
  @Input() cancelText: string = 'Cancelar';

  // State
  @Input() loading: Signal<boolean> = signal(false);

  // Events
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();
  @Output() backdropClicked = new EventEmitter<void>();

  // Internal State
  isOpen: WritableSignal<boolean> = signal(false);
  isVisible: WritableSignal<boolean> = signal(false);

  private originalBodyOverflow: string = '';
  private animationTimeout?: number;

  readonly drawerClasses = computed<string>(() => {
    const position = this.position;
    const size = this.size;

    // Base Classes
    let clasess = '';

    // Position Classes
    switch(position) {
      case 'right':
        clasess += 'inset-y-0 right-0';
        break;
      case 'left':
        clasess += 'inset-y-0 left-0';
        break;
      case 'top':
        clasess += 'inset-x-0 top-0';
        break;
      case 'bottom':
        clasess += 'inset-x-0 bottom-0';
        break;
    }

    // Size Classes
    if (position === 'left' || position === 'right') {
      
    }


    return clasess;
  })











}
