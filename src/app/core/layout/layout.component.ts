import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { faGhost } from "@fortawesome/free-solid-svg-icons";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { RouterLink, RouterOutlet } from "@angular/router";
import { TodoStore } from "../../features/todo/store/todo.slice";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [TodoStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  protected readonly store = inject(TodoStore);
  protected readonly faGhost = faGhost;
}
