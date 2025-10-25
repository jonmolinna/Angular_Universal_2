import { Routes } from '@angular/router';
import { Page as Page1 } from './dropdown-1/page/page';
import { Page as Page2 } from './dropdown-2/page/page';

export const DROPDOWN_ROUTES: Routes = [
  {
    path: 'dropdown-1',
    component: Page1,
  },
  {
    path: 'dropdown-2',
    component: Page2,
  },
];
