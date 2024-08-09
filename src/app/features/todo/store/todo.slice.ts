import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo.model";
import { computed, inject } from "@angular/core";
import { differenceInCalendarDays, parse } from "date-fns";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { map, pipe, switchMap } from "rxjs";
import { TodoService } from "../services/todo.service";
import { tapResponse } from "@ngrx/operators";

type TodoState = {
  todos: Todo[];
  filledOnly: boolean,
};

const initialState: TodoState = {
  todos: [],
  filledOnly: false,
};

const filledFilter = (item: Todo) => !!item.content && !!item.date && !!item.location;

const daysDifference = (item: Todo) => differenceInCalendarDays(
  new Date(), parse(item.date ?? '1970-01-01', 'yyyy-MM-dd', new Date())
);

export const TodoStore = signalStore(
  withState(initialState),
  withComputed(({ todos, filledOnly }) => ({
    filledTodos: computed(() => todos().filter(item => !filledOnly() || filledFilter(item))),
    todayTodosCount: computed(() => {
      return todos().reduce((count, item) => daysDifference(item) === 0 ? count + 1 : count, 0)
    }),
    futureTodosCount: computed(() => {
      return todos().reduce((count, item) => daysDifference(item) < 0 ? count + 1 : count, 0)
    }),
  })),
  withMethods((store, todoService = inject(TodoService)) => ({
    updateFilledOnly(filledOnly: boolean): void {
      patchState(store, { filledOnly });
    },
    loadTodosList: rxMethod<void>(
      pipe(
        switchMap(() => todoService.loadTodosList().pipe(
          switchMap((todos: Todo[]) => todoService.getLocationInfo(todos?.[0]).pipe(
              map((extras) => {
                todos[0].extras = { ...extras };

                return todos;
              }),
            )
          ),
          tapResponse({
            next: (todos) => patchState(store, { todos }),
            error: (err) => console.error(err),
          }),
        ))
      )
    ),
  })),
);
