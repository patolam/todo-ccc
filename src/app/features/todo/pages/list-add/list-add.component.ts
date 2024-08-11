import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { TodoStore } from "../../store/todo.store";
import { Todo } from "../../models/todo.model";
import { Router } from "@angular/router";

@Component({
  selector: 'app-list-add',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './list-add.component.html',
  styleUrl: './list-add.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAddComponent {
  readonly #todoStore = inject(TodoStore);
  readonly #router = inject(Router);
  readonly #fb = inject(FormBuilder);

  form = this.#fb.group({
    location: ['', Validators.maxLength(50)],
    date: ['', Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')],
    content: ['', Validators.maxLength(400)],
  });

  saveTask() {
    this.#todoStore.saveTodo({
      ...this.form.value,
    } as Todo);

    this.#router.navigate(['list']);
  }
}
