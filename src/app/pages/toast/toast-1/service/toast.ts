import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import { TOAST_MESSAGE } from '../model/toast.model';

@Injectable({
  providedIn: 'root',
})
export class Toast {
  private toasts: WritableSignal<TOAST_MESSAGE[]> = signal([]);
  private autoRemoveTimeouts = new Map<string, number>();

  // Public readonly signal
  readonly toastList = computed<TOAST_MESSAGE[]>(() => this.toasts());

  // Default durations for each type (in milliseconds)
  private defaultDurations = {
    success: 5000,
    info: 5000,
    warning: 7000,
    error: 10000,
  };

  // Public methods
  success(title: string, message?: string, options?: Partial<TOAST_MESSAGE>): string {
    return this.addToast({
      type: 'success',
      title,
      message,
      icon: '✅',
      ...options,
    });
  }

  error(title: string, message?: string, options?: Partial<TOAST_MESSAGE>): string {
    return this.addToast({
      type: 'error',
      title,
      message,
      icon: '❌',
      persistent: true, // Errors are persistent by default
      ...options,
    });
  }

  warning(title: string, message?: string, options?: Partial<TOAST_MESSAGE>): string {
    return this.addToast({
      type: 'warning',
      title,
      message,
      icon: '⚠️',
      ...options,
    });
  }

  info(title: string, message?: string, options?: Partial<TOAST_MESSAGE>): string {
    return this.addToast({
      type: 'info',
      title,
      message,
      icon: 'ℹ️',
      ...options,
    });
  }

  // Generic method to add custom toast
  addToast(toast: Partial<TOAST_MESSAGE>): string {
    const id = this.generateId();
    const duration = toast.duration ?? this.defaultDurations[toast.type || 'info'];

    const newToast: TOAST_MESSAGE = {
      id,
      type: 'info',
      title: '',
      timestamp: new Date(),
      duration,
      persistent: false,
      ...toast,
    };

    // Add to the list
    const currentToasts = this.toasts();
    this.toasts.set([...currentToasts, newToast]);

    // Set auto-remove timer if not persistent
    if (!newToast.persistent && duration > 0) {
      this.setAutoRemove(id, duration);
    }

    return id;
  }

  // Remove specific toast
  removeToast(id: string): void {
    const currentToasts = this.toasts();
    this.toasts.set(currentToasts.filter((toast) => toast.id !== id));
    this.clearAutoRemove(id);
  }

  // Remove all toasts
  clearAll(): void {
    const currentToasts = this.toasts();
    currentToasts.forEach((toast) => this.clearAutoRemove(toast.id));
    this.toasts.set([]);
  }

  // Remove toasts by type
  clearByType(type: TOAST_MESSAGE['type']): void {
    const currentToasts = this.toasts();
    const toastsToRemove = currentToasts.filter((toast) => toast.type === type);

    toastsToRemove.forEach((toast) => this.clearAutoRemove(toast.id));
    this.toasts.set(currentToasts.filter((toast) => toast.type !== type));
  }

  // Update existing toast
  updateToast(id: string, updates: Partial<TOAST_MESSAGE>): void {
    const currentToasts = this.toasts();
    const toastIndex = currentToasts.findIndex((toast) => toast.id === id);

    if (toastIndex !== -1) {
      const updatedToasts = [...currentToasts];
      updatedToasts[toastIndex] = { ...updatedToasts[toastIndex], ...updates };
      this.toasts.set(updatedToasts);
    }
  }

  // Get toast by ID
  getToast(id: string): TOAST_MESSAGE | undefined {
    return this.toasts().find((toast) => toast.id === id);
  }

  // Private methods
  private setAutoRemove(id: string, duration: number): void {
    const timeoutId = setTimeout(() => {
      this.removeToast(id);
    }, duration) as any;

    this.autoRemoveTimeouts.set(id, timeoutId);
  }

  private clearAutoRemove(id: string): void {
    const timeoutId = this.autoRemoveTimeouts.get(id);

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.autoRemoveTimeouts.delete(id);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  // Convenience methods for common scenarios
  saveSuccess(): string {
    return this.success('Guardado exitoso', 'Los cambios se han guardado correctamente');
  }
  deleteSuccess(): string {
    return this.success('Eliminado', 'El elemento se eliminó correctamente');
  }

  networkError(): string {
    return this.error(
      'Error de conexión',
      'No se pudo conectar al servidor. Verifica tu conexión a internet.'
    );
  }

  validationError(message: string): string {
    return this.error('Error de validación', message);
  }

  loadingToast(title: string): string {
    return this.info(title, 'Por favor espera...', {
      persistent: true,
      icon: '⏳',
    });
  }
}
