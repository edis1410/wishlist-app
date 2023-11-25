import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./landing/landing.module').then((m) => m.LandingModule),},
  { path: 'login', title: 'Login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule),},
  { path: 'register', title: 'Register', loadChildren: () => import('./register/register.module').then((m) => m.RegisterModule),},
  { path: 'dashboard', title: 'Dashboard', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'events', title: 'Events', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./events/events.module').then(m => m.EventsModule) },
  { path: 'create-event', title: 'Create event', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./create-event/create-event.module').then(m => m.CreateEventModule) },
  { path: 'event/:id', title: 'Event', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./event-details/event-details.module').then(m => m.EventDetailsModule)  },
  { path: ':id/add-item', title: 'Add item', canActivate: [() => inject(AuthGuardService).canActivate()], loadChildren: () => import('./add-item/add-item.module').then(m => m.AddItemModule) },
  { path: '**', title: 'Page not found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
