import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from "../../store/todo.store";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsComponent {
  readonly todoStore = inject(TodoStore);
}
