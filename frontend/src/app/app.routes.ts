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

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: ToursComponent },
      { path: 'tour/:id', component: TourComponent },
      { path: 'bookings', component: BookingsComponent },
      { path: 'favorites', component: FavoritesComponent },
      { path: 'profile', component: ProfileComponent },
    ],
  },
  { path: 'dashboard', component: DashboardComponent },
];
