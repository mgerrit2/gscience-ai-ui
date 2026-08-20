import { Routes } from '@angular/router';
import { ClassefyDogAndCats } from './components/classefy-dog-and-cats/classefy-dog-and-cats';
import { Statistics } from './components/statistics/statistics';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'app-classefy-dog-and-cats', // Updated to match your route path
    pathMatch: 'full',
  },
  {
    path: 'app-classefy-dog-and-cats',
    component: ClassefyDogAndCats,
  },
  {
    path: 'app-statistics',
    component: Statistics,
  },
];
