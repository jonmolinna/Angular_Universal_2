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
];
