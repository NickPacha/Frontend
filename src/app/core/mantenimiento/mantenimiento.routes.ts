import { Routes } from '@angular/router';

export const MANTENIMIENTO_ROUTES: Routes = [
  {
    path: 'vehiculo',
    loadComponent: () =>
      import('./vehiculo/vehiculo.component').then(m => m.VehiculoComponent)
  }
];