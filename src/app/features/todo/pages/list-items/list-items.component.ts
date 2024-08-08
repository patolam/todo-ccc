import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TodoStore } from "../../store/todo.slice";

@Component({
  selector: 'app-list-items',
  standalone: true,
  imports: [],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
  providers: [TodoStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsComponent {
  protected readonly store = inject(TodoStore);
}
