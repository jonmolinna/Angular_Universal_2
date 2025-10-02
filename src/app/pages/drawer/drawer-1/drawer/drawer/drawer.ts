import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { DRAWER_POSITION, DRAWER_SIZE } from '../model/drawer.model';

@Component({
  selector: 'app-drawer',
  imports: [CommonModule],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class Drawer implements OnInit, OnDestroy {
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
  @Input() showDefaultActions: boolean = true;
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
    switch (position) {
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
      const widthMap = {
        sm: 'w-80', // 320px
        md: 'w-96', // 384px
        lg: 'w-120', // 480px (custom)
        xl: 'w-144', // 576px (custom)
        full: 'w-full',
      };

      clasess += ` ${widthMap[size as keyof typeof widthMap] || widthMap['md']}`;
    } else {
      const heightMap = {
        sm: 'h-64', // 256px
        md: 'h-80', // 320px
        lg: 'h-96', // 384px
        xl: 'h-120px', // 480px (custom)
        full: 'h-full',
      };

      clasess += heightMap[size] || heightMap.md;
    }

    return clasess;
  });

  positionTransforms = computed(() => {
    const position = this.position;
    const isVisible = this.isVisible();

    if (!isVisible) {
      // Hidden state transforms
      switch (position) {
        case 'right':
          return 'translate-x-full';
        case 'left':
          return '-translate-x-full';
        case 'top':
          return '-translate-y-full';
        case 'bottom':
          return 'translate-y-full';
        default:
          return 'translate-x-full';
      }
    }

    // Visible State
    return 'translate-x-0 translate-y-0';
  });

  // Public Methods
  open(): void {
    if (!this.isBrowser) return;

    this.isOpen.set(true);

    // Trigger animation after DOM update
    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);

    this.opened.emit();

    if (this.preventBodyScroll) {
      this.disableBodyScroll();
    }
  }

  close(): void {
    if (!this.isBrowser) return;

    // Start closing animation
    this.isVisible.set(false)

    // Wait for animation to complete before removing from DOM
    this.animationTimeout = setTimeout(() => {
      this.isOpen.set(false);
      this.closed.emit();

      if (this.preventBodyScroll) {
        this.restoreBodyScroll();
      }
    }, 300) as any
  }

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  cancel(): void {
    this.cancelled.emit();
    this.close();
  }

  // Event Handlers
  onBackdropClick(): void {
    if (this.closeOnBackdrop) {
      this.backdropClicked.emit();
      this.close();
    }
  }

  private handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.isOpen() && this.closeOnEscape) {
      this.close();
    }
  }

  // Utility Methods
  private disableBodyScroll(): void {
    if (!this.isBrowser) return;

    this.originalBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private restoreBodyScroll(): void {
    if (!this.isBrowser) return;

    document.body.style.overflow = this.originalBodyOverflow;
  }

  // Ciclo de Vida
  ngOnInit(): void {
    if (this.isBrowser && this.closeOnEscape) {
      document.addEventListener('keydown', this.handleEscape.bind(this))
    }
  }

  ngOnDestroy(): void {
   if (this.isBrowser) {
    document.removeEventListener('keydown', this.handleEscape.bind(this));
    this.restoreBodyScroll();

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }
   } 
  }

  
}
