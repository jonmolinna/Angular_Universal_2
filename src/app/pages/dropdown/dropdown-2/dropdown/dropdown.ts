import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { DROPDOWN_OPTION } from '../model/dropdown.model';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);
  private isBrowser = isPlatformBrowser(this.platformId);

  // INPUT
  @Input() options: DROPDOWN_OPTION[] = [];
  @Input() icon: SafeHtml = '';
  @Input() position: 'left' | 'right' | 'center' = 'left';
  @Input() closeOnClickOutside: boolean = true;
  @Input() closeOnSelect: boolean = true;
  @Input() classes: string = '';

  // EVENTS
  @Output() optionSelected = new EventEmitter<DROPDOWN_OPTION>();
  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  // STATE
  isOpen: WritableSignal<boolean> = signal(false);
  isVisible: WritableSignal<boolean> = signal(false);
  private animationTimeout?: number;
  private handleDocumentClick = this.onDocumentClick.bind(this);

  // COMPUTED
  menuClasses = computed<string>(() => {
    const baseClasses = 'w-56 focus:outline-none';
    const positionClasses =
      this.position === 'left'
        ? 'left-0'
        : this.position === 'right'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

    return `${baseClasses} ${positionClasses}`;
  });

 triggerId = `dropdown-trigger-${Math.random().toString(36).slice(2, 11)}`;

 
  // METODOS PUBLICOS
  open(): void {
    if (!this.isBrowser) return;

    this.isOpen.set(true);

    setTimeout(() => {
      this.isVisible.set(true);
    }, 10);

    this.opened.emit();
  }

  close(): void {
    if (!this.isBrowser) return;

    this.isVisible.set(false);

    if (this.animationTimeout) {
      clearTimeout(this.animationTimeout);
    }

    this.animationTimeout = setTimeout(() => {
      this.isOpen.set(false);
      this.closed.emit();
    }, 200) as any;
  }

  toggle() {
    this.isOpen() ? this.close() : this.open();
  }

  selectOption(option: DROPDOWN_OPTION): void {
    if (option.disabled) return;
    this.optionSelected.emit(option);

    if (this.closeOnSelect) {
      this.close();
    }
  }

  // Event Handlers
  // Si el click fue fuera del dropdown, cerrarlo
  private onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  // Abril con el teclado de la flecha de abajo
  onArrowDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    if (!this.isOpen()) {
      this.open();
    }

    // TODO: Focus next option
  }

  // Abril con el teclado de la flecha de arriba
  onArrowUp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    if (!this.isOpen()) {
      this.open();
    }

    // TODO: Focus previous option
  }

  // Abril o Cerrar con el teclado de Enter
  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.toggle();
  }

  // Ciclo de Vida
  ngOnInit(): void {
    if (this.isBrowser && this.closeOnClickOutside) {
      document.addEventListener('click', this.handleDocumentClick);
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('click', this.handleDocumentClick);

      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
    }
  }
}
