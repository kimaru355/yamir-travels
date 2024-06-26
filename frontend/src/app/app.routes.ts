import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { TourComponent } from './pages/tour/tour.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookingsComponent } from './pages/bookings/bookings.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ToursComponent } from './pages/tours/tours.component';
import { ManageEventsComponent } from './pages/manage-events/manage-events.component';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { authGuard } from './guards/auth.guard';
import { authRoutesGuard } from './guards/auth-routes.guard';
import { ManageUsersComponent } from './pages/manage-users/manage-users.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [authRoutesGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [authRoutesGuard],
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ToursComponent },
      { path: 'tour/:id', component: TourComponent },
      {
        path: 'bookings',
        component: BookingsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: 'events',
        component: ManageEventsComponent,
        canActivate: [authGuard],
      },
      {
        path: 'create-event',
        component: CreateEventComponent,
        canActivate: [authGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [authGuard],
      },
      {
        path: 'users',
        component: ManageUsersComponent,
        canActivate: [authGuard],
      },
    ],
  },

  { path: '**', redirectTo: '' },
];
