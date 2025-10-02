import { Component } from '@angular/core';
import { Drawer } from '../drawer/drawer/drawer';

@Component({
  selector: 'app-page',
  imports: [Drawer],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  onCreateUser(): void {
    console.log('CREANDO NUEVO USUARIO ...');
  }

  onCancelForm(): void {
    console.log('FORMULARIO CANCELADO');
  }

  onApplySettings(): void {
    console.log('⚙️ Aplicando configuración...');
  }
}
