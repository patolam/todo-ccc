import { Todo } from "../models/todo.model";
import { differenceInCalendarDays, parse } from "date-fns";

export const filledFilter = (item: Todo) => !!item.content && !!item.date && !!item.location;

export const daysDifference = (item: Todo) => item.date ? differenceInCalendarDays(
  new Date(), parse(item.date, 'yyyy-MM-dd', new Date())
) : NaN;
