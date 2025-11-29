import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { MainLayoutComponent } from './shared/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: DashboardComponent },
    ]
  },
  // imports...
  {
    path: 'mantenimiento',
    loadChildren: () =>
      import('./core/mantenimiento/mantenimiento.routes').then(m => m.MANTENIMIENTO_ROUTES)
  },

  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }

];
