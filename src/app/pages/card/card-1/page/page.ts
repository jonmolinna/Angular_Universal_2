import { Component, signal, WritableSignal } from '@angular/core';
import { Card } from '../card/card';
import { CARD_ACTION } from '../model/card.model';

@Component({
  selector: 'app-page',
  imports: [Card],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  // State
  loading: WritableSignal<boolean> = signal<boolean>(false);

  // Actions for different card types
  imageCardActions: CARD_ACTION[] = [
    {
      label: 'Ver más',
      action: () => console.log('Ver más clicked'),
      icon: '👁️',
      variant: 'primary',
    },
    {
      label: 'Compartir',
      action: () => console.log('Compartir clicked'),
      icon: '🔗',
      variant: 'secondary',
    },
  ];

  productCardActions: CARD_ACTION[] = [
    {
      label: 'Comprar',
      action: () => console.log('Comprar clicked'),
      icon: '🛒',
      variant: 'primary',
    },
    {
      label: 'Favorito',
      action: () => console.log('Favorito clicked'),
      icon: '❤️',
      variant: 'ghost',
    },
  ];

  loadingCardActions: CARD_ACTION[] = [
    {
      label: 'Cargar datos',
      action: () => this.simulateLoading(),
      icon: '⬇️',
      variant: 'primary',
    },
  ];

  multipleActions: CARD_ACTION[] = [
    {
      label: 'Editar',
      action: () => console.log('Editar clicked'),
      icon: '✏️',
      variant: 'secondary',
    },
    {
      label: 'Duplicar',
      action: () => console.log('Duplicar clicked'),
      icon: '📋',
      variant: 'secondary',
    },
    {
      label: 'Eliminar',
      action: () => console.log('Eliminar clicked'),
      icon: '🗑️',
      variant: 'danger',
    },
  ];

  // Event Handlers
  onCardClick(type: string): void {
    console.log(`Card clicked: ${type}`);
  }

  onArticleClick(): void {
    console.log('Article card clicked');
  }

  simulateLoading(): void {
    this.loading.set(true);

    setTimeout(() => {
      this.loading.set(false);
      alert('¡Datos cargados exitosamente!');
    }, 2000);
  }

  handleClickMe(): void {
    console.log('CLICK ME ----> ');
  }
}
