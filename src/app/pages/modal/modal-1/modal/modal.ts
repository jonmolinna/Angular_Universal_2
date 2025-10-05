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
import { MODAL_POSITION, MODAL_SIZE, MODAL_TYPE } from '../model/modal.model';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Configuration Inputs
  @Input() title: string = '';
  @Input() subTitle: string = '';
  @Input() size: MODAL_SIZE = 'md';
  @Input() position: MODAL_POSITION = 'center';
  @Input() modalType: MODAL_TYPE = 'success';

  // Appearance Inputs
  @Input() showIcon: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() showCancel: boolean = false;
  @Input() transparent: boolean = false;
  @Input() blur: boolean = false;

  // Layout Inputs
  @Input() hideHeader: boolean = false;
  @Input() hideFooter: boolean = false;

  // Behavior Inputs
  @Input() closeOnBackdrop: boolean = true;
  @Input() closeOnEscape: boolean = true;
  @Input() preventBodyScroll: boolean = true;

  // Button texts
  @Input() confirmText: string = 'Confirmar';
  @Input() cancelText: string = 'Cancelar';
  @Input() closeButtonLabel: string = 'Cerrar';
  @Input() loadingText: string = 'Cargando...';

  //  State
  @Input() loading: Signal<boolean> = signal<boolean>(false);

  // Events
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<void>();
  @Output() canceled = new EventEmitter<void>();
  @Output() backdropClicked = new EventEmitter<void>();

  // Internal State
  isOpen: WritableSignal<boolean> = signal(false);
  isVisible: WritableSignal<boolean> = signal(false);
  private originalBodyOverflow: string = '';
  private animationTimeout?: number;

  // Computed Properties
  sizeClasses = computed<string>(() => {
    const sizeMap = {
      sm: 'w-full max-w-sm',
      md: 'w-full max-w-lg',
      lg: 'w-full max-w-2xl',
      xl: 'w-full max-w-4xl',
      '2xl': 'w-full max-w-6xl',
      full: 'w-full max-w-full mx-4',
    };

    return sizeMap[this.size];
  });

  positionClasses = computed<string>(() => {
    const positionMap = {
      center: 'items-center justify-center',
      top: 'items-start justify-center pt-16',
      bottom: 'items-end justify-center pb-16',
    };

    return positionMap[this.position];
  });

  iconContainerClasses = computed<string>(() => {
    const iconMap = {
      success: 'bg-green-100',
      warning: 'bg-amber-100',
      error: 'bg-red-100',
      info: 'bg-blue-100',
      default: 'bg-gray-100',
    };

    return iconMap[this.modalType];
  });

  titleClasses = computed<string>(() => {
    const titleMap = {
      success: 'text-green-900',
      warning: 'text-amber-900',
      error: 'text-red-900',
      info: 'text-blue-900',
      default: 'text-gray-900',
    };

    return titleMap[this.modalType];
  });

  headerClasses = computed<string>(() => {
    const headerMap = {
      success: 'border-b border-green-200',
      warning: 'border-b border-amber-200',
      error: 'border-b border-red-200',
      info: 'border-b border-blue-200',
      default: '',
    };

    return headerMap[this.modalType];
  });

  footerClasses = computed<string>(() => {
    const footerMap = {
      success: 'bg-green-50',
      warning: 'bg-amber-50',
      error: 'bg-red-50',
      info: 'bg-blue-50',
      default: 'bg-gray-50',
    };

    return footerMap[this.modalType];
  });

  primaryButtonClasses = computed<string>(() => {
    const buttonMap = {
      success: 'bg-green-600 text-white hover:bg-green-500 focus-visible:outline-green-600',
      warning: 'bg-amber-600 text-white hover:bg-amber-500 focus-visible:outline-amber-600',
      error: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
      info: 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600',
      default: 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600',
    };
    return (
      buttonMap[this.modalType] +
      ' focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
    );
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
    this.isVisible.set(false);

    // Wait for animation to complete before removing from DOM
    this.animationTimeout = setTimeout(() => {
      this.isOpen.set(false);
      this.closed.emit();

      // Restore body scroll
      if (this.preventBodyScroll) {
        this.restoreBodyScroll();
      }
    }, 300) as any;
  }

  toggle(): void {
    this.isOpen() ? this.close() : this.open();
  }

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  cancel(): void {
    this.canceled.emit();
    this.close();
  }

  // Event Handlers
  onBackdropClick(event: MouseEvent): void {
    if (this.closeOnBackdrop && event.target === event.currentTarget) {
      this.backdropClicked.emit();
      this.close();
    }
  }

  private handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.open() && this.closeOnEscape) {
      this.close();
    }
  }

  // Utility Methods
  hasCustomFooter(): boolean {
    // En un caso real, podrías verificar si hay contenido en el slot footer
    return false; // Simplified for this example
  }

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
      document.addEventListener('keydown', this.handleEscape.bind(this));
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
