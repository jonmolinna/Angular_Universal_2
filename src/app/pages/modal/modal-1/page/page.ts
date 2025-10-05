import { Component, signal, WritableSignal } from '@angular/core';
import { Modal } from '../modal/modal';
import { CommonModule } from '@angular/common';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  sendWelcomeEmail: boolean;
  activeImmediately: boolean;
}

@Component({
  selector: 'app-page',
  imports: [CommonModule, Modal],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  // State
  isCreatingUser: WritableSignal<boolean> = signal(false);
  activeTab: 'overview' | 'details' | 'settings' = 'overview';

  // formData: UserFormData = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phone: '',
  //   role: '',
  //   sendWelcomeEmail: true,
  //   activeImmediately: false,
  // };

  // Event Handlers
  onConfirmDelete(): void {
    console.log('🗑️ Eliminando elemento...');

    // Simular eliminación
    // setTimeout(() => {
    //   alert('Elemento eliminado correctamente');
    // }, 1000);
  }

  onCancelDelete(): void {
    console.log('❌ Eliminación cancelada');
  }

  onSuccess(): void {
    console.log('🎉 Modal de éxito cerrado');
  }

  onCreateUser(): void {
    // console.log('👤 Creando usuario:', this.formData);

    // Simular creación de usuario
    this.isCreatingUser.set(true);

    // setTimeout(() => {
    //   this.isCreatingUser.set(false);
    //   alert('Usuario creado exitosamente!');

    //   // Reset form
    //   this.formData = {
    //     firstName: '',
    //     lastName: '',
    //     email: '',
    //     phone: '',
    //     role: '',
    //     sendWelcomeEmail: true,
    //     activeImmediately: false,
    //   };
    // }, 2000);
  }

  onCancelForm(): void {
    console.log('❌ Formulario cancelado');

    // Reset form
    // this.formData = {
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   role: '',
    //   sendWelcomeEmail: true,
    //   activeImmediately: false,
    // };
  }
}
