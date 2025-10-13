import {
  Component,
  computed,
  EventEmitter,
  Input,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  CARD_ACTION,
  CARD_BADGE,
  CARD_RADIUS,
  CARD_SHADOW,
  CARD_SIZE,
  CARD_VARIANT,
} from '../model/card.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  // Configuration
  @Input() variant: CARD_VARIANT = 'default';
  @Input() size: CARD_SIZE = 'md';
  @Input() radius: CARD_RADIUS = 'md';
  @Input() shadow: CARD_SHADOW = 'sm';

  // Content
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() content?: string;
  @Input() footerText?: string;

  // Image
  @Input() imageUrl?: string;
  @Input() imagenAlt?: string;
  @Input() imageHeight?: string = 'h-48';

  // Interactions
  @Input() clickable: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() hoverEffect: 'scale' | 'lift' | 'shadow' = 'shadow';
  @Input() disabled: boolean = false;

  // Accessories
  @Input() badge?: CARD_BADGE;
  @Input() actions?: CARD_ACTION[];

  // State
  @Input() loading: WritableSignal<boolean> = signal(false);

  // Accessibility
  @Input() ariaLabel?: string;

  // Events
  @Output() cardClick = new EventEmitter<MouseEvent>();
  @Output() actionClick = new EventEmitter<{ action: CARD_ACTION; event: MouseEvent }>();

  // Computed Properties
  containerClasses = computed<string>(() => {
    const variantMap = {
      default: 'bg-white border border-gray-200',
      outlined: 'bg-white border-2 border-gray-300',
      elevated: 'bg-white border border-gray-100',
      flat: 'bg-gray-50',
      bordered: 'bg-white border-2 border-blue-200',
    };

    const sizeMap = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };

    const radiusMap = {
      none: 'rounded-none',
      sm: 'rounded-sm',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    };

    const shadowMap = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
      xl: 'shadow-xl',
    };

    let classes = `${variantMap[this.variant]} ${sizeMap[this.size]} ${radiusMap[this.radius]} ${shadowMap[this.shadow]}`;

    if (this.disabled) {
      classes += ' opacity-60 cursor-not-allowed';
    } else if (this.clickable || this.hoverable) {
      classes += ' hover:shadow-md';
    }

    return classes;
  });

  headerClasses = computed<string>(() => {
    const sizeMap = {
      sm: 'pb-2',
      md: 'pb-3',
      lg: 'pb-4',
      xl: 'pb-6',
    };
    return sizeMap[this.size];
  });

  titleClasses = computed<string>(() => {
    const sizeMap = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    };

    return sizeMap[this.size];
  });

  subtitleClasses = computed<string>(() => {
    const sizeMap = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-sm',
      xl: 'text-base',
    };
    return sizeMap[this.size];
  });

  imageClasses = computed<string>(() => {
    let classes = `overflow-hidden ${this.imageHeight}`;

    if (!this.hasHeader()) {
      const radiusMap = {
        none: '',
        sm: 'rounded-t-sm',
        md: 'rounded-t-lg',
        lg: 'rounded-t-xl',
        xl: 'rounded-t-2xl',
        full: 'rounded-t-full',
      };
      classes += ` ${radiusMap[this.radius]}`;
    }

    return classes;
  });

  contentClasses = computed<string>(() => {
    const sizeMap = {
      sm: 'py-2',
      md: 'py-3',
      lg: 'py-4',
      xl: 'py-6',
    };
    return sizeMap[this.size];
  });

  footerClasses = computed<string>(() => {
    const sizeMap = {
      sm: 'pt-2 border-t border-gray-100',
      md: 'pt-3 border-t border-gray-100',
      lg: 'pt-4 border-t border-gray-100',
      xl: 'pt-6 border-t border-gray-100',
    };
    return sizeMap[this.size];
  });

  badgeClasses = computed(() => {
    if (!this.badge) return '';

    const variantMap = {
      default: 'bg-gray-100 text-gray-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800',
    };

    return variantMap[this.badge.variant || 'default'];
  });

  // Helper Methods
  hasHeader(): boolean {
    return !!(this.title || this.subtitle || this.badge);
  }

  hasImageSlot(): boolean {
    // This would need to be implemented with ViewChild if needed
    return false;
  }

  hasContent(): boolean {
    return !!this.content;
  }

  hasFooter(): boolean {
    return !!(this.footerText || (this.actions && this.actions.length > 0));
  }

  onCardClick(): void {
    if (!this.disabled && this.clickable) {
      this.cardClick.emit();
    }
  }

  onActionClick(action: CARD_ACTION, event: MouseEvent): void {
    event.stopPropagation(); // Prevent card click

    if (!action.disabled && !action.loading) {
      this.actionClick.emit({ action, event });
      action.action();
    }
  }

  actionButtonClasses(variant: CARD_ACTION['variant']): string {
    const variantMap = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
      ghost: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
    };

    return variantMap[variant || 'secondary'];
  }
}
