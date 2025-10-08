import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from '@angular/core';
import { AccordionItem, AccordionMode, AccordionVariant } from '../model/accordion.model';

@Component({
  selector: 'app-accordion',
  imports: [CommonModule],
  templateUrl: './accordion.html',
  styleUrl: './accordion.css',
})
export class Accordion implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  // Configuration
  @Input() items: AccordionItem[] = [];
  @Input() mode: AccordionMode = 'single';
  @Input() variant: AccordionVariant = 'default';
  @Input() allowCollapse: boolean = true;
  @Input() defaultExpanded: string[] = [];
  @Input() disabled: boolean = false;

  // Events
  @Output() itemToggled = new EventEmitter<{ id: string; expanded: boolean }>();
  @Output() expandedChanged = new EventEmitter<string[]>();

  // State
  expandedItems: WritableSignal<Set<string>> = signal(new Set());

  // Computed
  containerClasses = computed<string>(() => {
    const variantMap = {
      default: 'divide-y divide-gray-200',
      bordered: 'border border-gray-200 rounded-lg divide-y divide-gray-200',
      separated: 'space-y-2',
      filled: 'bg-gray-50 rounded-lg',
    };

    return variantMap[this.variant];
  });

  // Public Methods
  isExpanded(itemId: string): boolean {
    return this.expandedItems().has(itemId);
  }

  expand(itemId: string): void {
    if (this.disabled) return;

    const item = this.items.find((item) => item.id === itemId);

    if (!item || item.disabled) return;

    const currentExpanded = new Set(this.expandedItems());

    if (this.mode === 'single') {
      // Single mode: collapse all others
      currentExpanded.clear();
    }

    currentExpanded.add(itemId);

    this.expandedItems.set(currentExpanded);

    this.emitEvents(itemId, true);
  }

  collapse(itemId: string): void {
    if (this.disabled) return;

    const currentExpanded = new Set(this.expandedItems());
    currentExpanded.delete(itemId);
    this.expandedItems.set(currentExpanded);

    this.emitEvents(itemId, false);
  }

  toggle(itemId: string): void {
    if (this.disabled) return;

    const item = this.items.find((item) => item.id === item.id);

    if (!item || item.disabled) return;

    if (this.isExpanded(itemId)) {
      // If it's the only expanded item and allowCollapse is false, don't collapse
      if (!this.allowCollapse && this.expandedItems().size === 1) {
        return;
      }

      this.collapse(itemId);
    } else {
      this.expand(itemId);
    }
  }

  expandAll(): void {
    if (this.disabled || this.mode === 'single') return;

    const allIds = new Set(this.items.filter((item) => !item.disabled).map((item) => item.id));
    this.expandedItems.set(allIds);
    this.expandedChanged.emit(Array.from(allIds));
  }

  collapseAll(): void {
    if (this.disabled) return;

    this.expandedItems.set(new Set());
    this.expandedChanged.emit([]);
  }

  // Helper Methods
  itemClasses(index: number): string {
    const variantMap = {
      default: '',
      bordered:
        index === 0
          ? 'first:rounded-t-lg'
          : index === this.items.length - 1
          ? 'last:rounded-b-lg'
          : '',
      separated: 'bg-white border border-gray-200 rounded-lg shadow-sm',
      filled:
        index === 0
          ? 'first:rounded-t-lg'
          : index === this.items.length - 1
          ? 'last:rounded-b-lg'
          : '',
    };

    return variantMap[this.variant];
  }

  headerClasses(item: AccordionItem): string {
    const baseClasses = 'w-full text-left';
    const variantMap = {
      default: 'hover:bg-gray-50',
      bordered: 'hover:bg-gray-50',
      separated: 'hover:bg-gray-50 rounded-lg',
      filled: 'hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg',
    };

    let classes = baseClasses + ' ' + variantMap[this.variant];

    if (this.isExpanded(item.id)) {
      classes += ' bg-blue-50';
    }

    return classes;
  }

  contentClasses(): string {
    const variantMap = {
      default: 'pt-2',
      bordered: 'pt-2',
      separated: 'pt-2',
      filled: 'pt-2 bg-white mx-3 mb-3 rounded-lg p-3',
    };

    return variantMap[this.variant];
  }

  private emitEvents(itemId: string, expanded: boolean): void {
    this.itemToggled.emit({ id: itemId, expanded });
    this.expandedChanged.emit(Array.from(this.expandedItems()));
  }

    ngOnInit() {
    // Set default expanded items
    if (this.defaultExpanded.length > 0) {
      const expanded = new Set(this.defaultExpanded);
      this.expandedItems.set(expanded);
    }
  }
}
