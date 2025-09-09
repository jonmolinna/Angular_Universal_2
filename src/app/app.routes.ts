import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'animations',
        loadChildren: () => import('./pages/animations/animation.routes').then(m => m.ROUTES_ANIMATIONS)
    },
    
    
];
