import { Routes } from '@angular/router';
import { ClassefyDogAndCats } from './components/classefy-dog-and-cats/classefy-dog-and-cats';

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
];
