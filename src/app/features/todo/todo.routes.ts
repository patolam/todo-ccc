import { Routes } from '@angular/router';
import { ListItemsComponent } from "./pages/list-items/list-items.component";
import { ListAddComponent } from "./pages/list-add/list-add.component";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => ListItemsComponent,
  },
  {
    path: 'add',
    loadComponent: () => ListAddComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
