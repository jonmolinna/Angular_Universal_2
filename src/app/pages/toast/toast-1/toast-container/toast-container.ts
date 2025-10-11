import { Component, inject, Input, signal, WritableSignal } from '@angular/core';
import { TOAST_ACTION, TOAST_POSITION } from '../model/toast.model';
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

  toastService = inject(ToastService);

  positionClasses(): string {
     const positionMap = {
      'top-right': 'top-0 right-0',
      'top-left': 'top-0 left-0',
      'bottom-right': 'bottom-0 right-0',
      'bottom-left': 'bottom-0 left-0',
      'top-center': 'top-0 left-1/2 transform -translate-x-1/2',
      'bottom-center': 'bottom-0 left-1/2 transform -translate-x-1/2'
    };

    return positionMap[this.position];
  }

  containerDirection(): string {
    const isBottom = this.position.includes('bottom');
    return isBottom ? 'flex-col-reverse' : 'flex-col';
  }

  onCloseToast(toastId: string): void {
    this.toastService.removeToast(toastId);
  }

  onActionClicked(event: {toastId: string; action: TOAST_ACTION }): void {
    console.log('Toast action clicked:', event);
  }







}
