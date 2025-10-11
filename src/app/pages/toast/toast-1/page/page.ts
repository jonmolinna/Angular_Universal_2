import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { Toast } from '../service/toast';

@Component({
  selector: 'app-page',
  imports: [CommonModule],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  toastService = inject(Toast);

   // Basic Toast Methods
  showSuccessToast(): void {
    this.toastService.success(
      'Operación exitosa',
      'La tarea se completó correctamente'
    );
  }

  showErrorToast(): void {
    this.toastService.error(
      'Error crítico',
      'Algo salió mal. Por favor, inténtalo de nuevo.'
    );
  }

  showWarningToast(): void {
    this.toastService.warning(
      'Advertencia importante',
      'Verifica la información antes de continuar'
    );
  }

  showInfoToast(): void {
    this.toastService.info(
      'Información útil',
      'Este es un mensaje informativo para el usuario'
    );
  }
}
