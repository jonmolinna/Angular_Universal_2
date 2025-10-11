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
  WritableSignal,
} from '@angular/core';
import { TOAST_ACTION, TOAST_MESSAGE } from '../model/toast.model';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @Input({ required: true }) toast!: TOAST_MESSAGE;
  @Input() showProgress: boolean = true;

  @Output() closeToast = new EventEmitter<string>();
  @Output() actionClicked = new EventEmitter<{ toastId: string; action: TOAST_ACTION }>();

  // State
  isVisible: WritableSignal<boolean> = signal(false);
  progressWidth: WritableSignal<number> = signal(100);

  private progressInterval?: number;
  private startTime?: number;

  // Computed Properties
  containerClasses = computed<string>(() => {
    const typeMap = {
      success: 'border-l-4 border-green-400',
      error: 'border-l-4 border-red-400',
      warning: 'border-l-4 border-amber-400',
      info: 'border-l-4 border-blue-400',
    };

    return typeMap[this.toast.type];
  });

  iconContainerClasses = computed<string>(() => {
    const typeMap = {
      success: 'bg-green-100',
      error: 'bg-red-100',
      warning: 'bg-amber-100',
      info: 'bg-blue-100',
    };

    return typeMap[this.toast.type];
  });

  progressBarClasses = computed<string>(() => {
    const typeMap = {
      success: 'from-green-400 to-green-600',
      error: 'from-red-400 to-red-600',
      warning: 'from-amber-400 to-amber-600',
      info: 'from-blue-400 to-blue-600',
    };

    return typeMap[this.toast.type];
  });

  close(): void {
    this.isVisible.set(false);

    // Wait for animation to complete
    setTimeout(() => {
      this.closeToast.emit(this.toast.id);
    }, 300);
  }

  onActionClick(action: TOAST_ACTION): void {
    this.actionClicked.emit({
      toastId: this.toast.id,
      action,
    });

    action.action();
  }

  actionButtonClasses(style: 'primary' | 'secondary'): string {
    const baseClasses =
      'inline-flex items-center px-3 py-1.5 border text-xs font-medium rounded transition-colors duration-200';

    if (style === 'primary') {
      const primaryMap = {
        success: 'border-green-300 text-green-800 bg-green-50 hover:bg-green-100',
        error: 'border-red-300 text-red-800 bg-red-50 hover:bg-red-100',
        warning: 'border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100',
        info: 'border-blue-300 text-blue-800 bg-blue-50 hover:bg-blue-100',
      };

      return baseClasses + ' ' + primaryMap[this.toast.type];
    }

    return baseClasses + ' border-gray-300 text-gray-700 bg-gray-50 hover:bg-gray-100';
  }

  private startProgressBar(): void {
    if (!this.isBrowser || !this.toast.duration) return;

    this.startTime = Date.now();

    this.progressInterval = setInterval(() => {
      if (!this.startTime || !this.toast.duration) return;

      const elapsed = Date.now() - this.startTime;
      const remaining = Math.max(0, this.toast.duration - elapsed);
      const progress = (remaining / this.toast.duration) * 100;

      this.progressWidth.set(progress);

      if (remaining <= 0) {
        this.clearProgressInterval();
      }
    }, 50) as any;
  }

  private clearProgressInterval(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = undefined;
    }
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    // Show toast with animation delay
    setTimeout(() => {
      this.isVisible.set(true);
    }, 50);

    // Start progress bar if not persistent
    if (!this.toast.persistent && this.toast.duration && this.toast.duration > 0) {
      this.startProgressBar();
    }
  }

  ngOnDestroy(): void {
    this.clearProgressInterval();
  }
}
