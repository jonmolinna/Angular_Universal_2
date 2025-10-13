import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'animations',
    loadChildren: () =>
      import('./pages/animations/animation.routes').then((m) => m.ROUTES_ANIMATIONS),
  },
  {
    path: 'dropdown',
    loadChildren: () => import('./pages/dropdown/dropdown.routes').then((m) => m.DROPDOWN_ROUTES),
  },
  {
    path: 'drawer',
    loadChildren: () => import('./pages/drawer/drawer.routes').then((m) => m.DRAWER_ROUTES),
  },
  {
    path: 'modal',
    loadChildren: () => import('./pages/modal/modal.routes').then((m) => m.MODAL_ROUTES),
  },
  {
    path: 'accordion',
    loadChildren: () =>
      import('./pages/accordion/accordion.routes').then((m) => m.ACCORDION_ROUTES),
  },
  {
    path: 'card',
    loadChildren: () => import('./pages/card/card.routes').then((m) => m.CARD_ROUTES),
  },
];
