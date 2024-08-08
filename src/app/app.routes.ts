import { Routes } from '@angular/router';
import { LayoutComponent } from "./core/layout/layout.component";
import { ListItemsComponent } from "./features/todo/pages/list-items/list-items.component";
import { ListAddComponent } from "./features/todo/pages/list-add/list-add.component";

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        loadChildren: () => import('./features/todo/todo.routes').then(m => m.routes),
      },
      {
        path: '**',
        redirectTo: 'list',
      }
    ]
  }
];
