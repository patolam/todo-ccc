import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo.model";
import { computed, inject } from "@angular/core";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { map, pipe, switchMap } from "rxjs";
import { TodoService } from "../services/todo.service";
import { tapResponse } from "@ngrx/operators";
import { daysDifference, filledFilter } from "./todo.helpers";

type TodoState = {
  todos: Todo[];
  filledOnly: boolean,
};

const initialState: TodoState = {
  todos: [],
  filledOnly: false,
};

export const TodoStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos, filledOnly }) => ({
    filledTodos: computed(() => todos().filter(item => !filledOnly() || filledFilter(item))),
    todayTodosCount: computed(() => todos().reduce((count, item) => daysDifference(item) === 0 ? count + 1 : count, 0)),
    futureTodosCount: computed(() => todos().reduce((count, item) => daysDifference(item) < 0 ? count + 1 : count, 0)),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    updateFilledOnly(filledOnly: boolean) {
      patchState(store, { filledOnly });
    },
    saveTodo(todo: Todo) {
      patchState(store, state => ({
        todos: [
          ...state.todos, {
            ...todo,
            id: state.todos.length,
          }
        ]
      }));
    },
    loadTodosList: rxMethod<void>(
      pipe(
        switchMap(() => todoService.getTodosList().pipe(
          tapResponse({
            next: (todos: Todo[]) => patchState(store, { todos }),
            error: (err) => console.error(err),
          }),
        ))
      )
    ),
    loadLocationInfo: rxMethod<Todo[]>(
      pipe(
        switchMap((todos: Todo[]) => todoService.getLocationInfo(todos?.[0]).pipe(
            map((extras) => {
              todos[0].extras = { ...extras };

              return todos;
            }),
            tapResponse({
              next: (todos: Todo[]) => patchState(store, { todos }),
              error: (err) => console.error(err),
            }),
          )
        ),
      )
    ),
  })),
  withHooks({
    onInit({ loadTodosList }) {
      loadTodosList();
      console.log('init')
    },
  }),
);
