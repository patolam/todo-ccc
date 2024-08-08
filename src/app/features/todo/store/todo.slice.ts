import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Todo } from "../models/todo.model";
import { computed } from "@angular/core";
import { differenceInCalendarDays, format, parse } from "date-fns";

const mockedTodos: Todo[] = [
  {
    id: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    content: 'Lorem ipsum',
    location: 'Warszawa, PL',
  },
  {
    id: 1,
    date: '2025-08-08',
    content: 'Sit dolor amet',
    location: 'Kraków, PL',
  },
  {
    id: 2,
    date: format(new Date(), 'yyyy-MM-dd'),
    content: '',
    location: 'Kraków, PL',
  }
]

type TodoState = {
  todos: Todo[];
  filledOnly: boolean,
};

const initialState: TodoState = {
  todos: mockedTodos,
  filledOnly: false,
};

const filledFilter = (item: Todo) => !!item.content && !!item.date && !!item.location;

const daysDifference = (item: Todo) => differenceInCalendarDays(new Date(), parse(item.date, 'yyyy-MM-dd', new Date()));

export const TodoStore = signalStore(
  withState(initialState),
  withComputed(({ todos, filledOnly }) => ({
    filledTodos: computed(() => todos().filter(item => !filledOnly() || filledFilter(item))),
    todayTodosCount: computed(() => {
      return todos().reduce((count, item) => daysDifference(item) === 0 ? count + 1 : count, 0)
    }),
    futureTodosCount: computed(() => {
      return todos().reduce((count, item) => daysDifference(item) < 0 ? count + 1 : count, 0)
    })
  })),
  withMethods((store) => ({
    updateFilledOnly(filledOnly: boolean): void {
      patchState(store, { filledOnly });
    },
  })),
);
