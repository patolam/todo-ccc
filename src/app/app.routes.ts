import { Routes } from '@angular/router';
import { LayoutComponent } from "./core/layout/layout.component";
import { ListItemsComponent } from "./pages/list-items/list-items.component";
import { ListAddComponent } from "./pages/list-add/list-add.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        loadComponent: () => ListItemsComponent,
      },
      {
        path: 'add',
        loadComponent: () => ListAddComponent,
      },
      {
        path: '**',
        redirectTo: 'list',
      }
    ]
  }
];
