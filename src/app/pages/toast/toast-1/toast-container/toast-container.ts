import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { TOAST_ACTION, TOAST_POSITION, TOAST_SIZE } from '../model/toast.model';
import { Toast as ToastService } from '../service/toast';
import { CommonModule } from '@angular/common';
import { Toast } from '../toast/toast';

@Component({
  selector: 'app-toast-container',
  imports: [CommonModule, Toast],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css'
})
export class ToastContainer {
  @Input() position: TOAST_POSITION = 'top-right';
  @Input() showProgress: boolean = true;
  @Input() maxToasts: number = 5;
  @Input() size: TOAST_SIZE = 'normal';

  toastService = inject(ToastService);

  positionClasses = computed(() => {
    const positionMap = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
    };
    return positionMap[this.position];
  });

  containerDirection = computed(() => {
    const isBottom = this.position.includes('bottom');
    return isBottom ? 'flex-col-reverse' : 'flex-col';
  });

  containerClasses = computed(() => {
    const sizeMap = {
      'compact': 'w-full max-w-[280px] sm:max-w-sm',           // 280px → 384px
      'normal': 'w-full max-w-xs sm:max-w-sm md:max-w-md',     // 320px → 384px → 448px
      'large': 'w-full max-w-sm sm:max-w-md md:max-w-lg'       // 384px → 448px → 512px
    };
    return `flex flex-col space-y-3 ${sizeMap[this.size]}`;
  });

  paddingClasses = computed(() => {
    return 'p-2 sm:p-4'; // Menos padding en móviles
  });

  onCloseToast(toastId: string): void {
    this.toastService.removeToast(toastId);
  }

  onActionClicked(event: {toastId: string; action: TOAST_ACTION }): void {
    console.log('Toast action clicked:', event);
  }







}
