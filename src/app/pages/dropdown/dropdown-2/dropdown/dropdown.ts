import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  EventEmitter,
  inject,
  Input,
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
export class Dropdown {
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
    
  }





}
