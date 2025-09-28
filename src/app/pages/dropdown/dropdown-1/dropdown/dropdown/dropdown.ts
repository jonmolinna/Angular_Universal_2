import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  Signal,
  WritableSignal,
} from '@angular/core';
import { DROPDOWN_OPTION } from '../model/dropdown.model';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.css',
})
export class Dropdown implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);
  private isBrowser = isPlatformBrowser(this.platformId);

  // INPUT
  @Input() options: DROPDOWN_OPTION[] = [];
  @Input() title: Signal<string> = signal('Select an Option');
  @Input() showArrow: boolean = true; // show icon title
  @Input() position: 'left' | 'right' | 'center' = 'left';
  @Input() closeOnClickOutside: boolean = true; // cierra click fuera del dropdown
  @Input() closeOnSelect: boolean = true; // cierra click en el menu
  @Input() classes: string = '';

  // EVENTS
  @Output() optionSelected = new EventEmitter<DROPDOWN_OPTION>();

  @Output() opened = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  // STATE
  isVisible: WritableSignal<boolean> = signal(true);
  isOpen: WritableSignal<boolean> = signal(false);
  private animationTimeout?: number;

  // COMPUTED
  menuClasses = computed(() => {
    const baseClasses = 'w-56 focus:outline-none';
    const positionClasses =
      this.position === 'left'
        ? 'left-0'
        : this.position === 'right'
        ? 'right-0'
        : 'left-1/2 -translate-x-1/2';

    return `${baseClasses} ${positionClasses}`;
  });

  triggerId = computed(() => `dropdown-trigger-${Math.random().toString(36).substr(2, 9)}`);

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
  private onDocumentClick(event: Event): void {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  onArrowDown(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    if (!this.isOpen()) {
      this.open();
    }

    // TODO: Focus next option
  }

  onArrowUp(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    if (!this.isOpen()) {
      this.open();
    }

    // TODO: Focus previous option
  }

  onEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    this.toggle();
  }

  // CICLO DE VIDA
  ngOnInit(): void {
    if (this.isBrowser && this.closeOnClickOutside) {
      document.addEventListener('click', this.onDocumentClick.bind(this));
    }
  }

  ngOnDestroy(): void {
    if (this.isBrowser) {
      document.removeEventListener('click', this.onDocumentClick.bind(this));

      if (this.animationTimeout) {
        clearTimeout(this.animationTimeout);
      }
    }
  }
}
