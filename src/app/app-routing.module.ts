import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),},
  { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),},
  { path: 'register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),},
  { path: 'dashboard', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'events', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
