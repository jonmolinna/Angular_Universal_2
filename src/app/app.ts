import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Toast } from './pages/toast/toast-1/service/toast';
import { ToastContainer } from './pages/toast/toast-1/toast-container/toast-container';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, ToastContainer],
  templateUrl: './app.html',
})
export class App {
  toastService = inject(Toast);
  showProgress: boolean = true;

  // Basic Toast Methods
  showSuccessToast(): void {
    this.toastService.success('Operación exitosa', 'La tarea se completó correctamente');
  }
}
