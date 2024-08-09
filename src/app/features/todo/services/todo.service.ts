import { inject, Injectable } from '@angular/core';
import { Todo, TodoExtras } from "../models/todo.model";
import { format } from "date-fns";
import { catchError, map, Observable, of, switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { TodoLocationInfoDto, TodoLocationResultDto, TodoLocationTemperatureDto } from "../models/todo.dto";

const mockedTodos: Todo[] = [
  {
    id: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    content: 'Lorem ipsum',
    location: 'Warszawa',
  },
  {
    id: 1,
    date: '2030-08-08',
    content: 'Sit dolor amet',
    location: 'Kraków',
  },
  {
    id: 2,
    date: format(new Date(), 'yyyy-MM-dd'),
    content: '',
    location: 'Kraków',
  },
  {
    id: 3,
    date: '2020-08-07',
    content: 'Lorem Wrocław',
    location: 'Wrocław',
  }
]

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  readonly httpClient = inject(HttpClient);

  loadTodosList(): Observable<Todo[]> {
    return of(mockedTodos);
  }

  getLocationInfo({ location }: Todo): Observable<TodoExtras> {
    return this.httpClient.get<TodoLocationInfoDto>(`https://geocoding-api.open-meteo.com/v1/search?name=${ location }&count=10&language=pl&format=json`).pipe(
      switchMap((locationInfo => {
        const { latitude, longitude } = locationInfo.results![0];

        return this.getLocationTemperature({ latitude, longitude }).pipe(
          map(temperature => {
            return {
              latitude,
              longitude,
              temperature,
            }
          })
        )
      })),
      catchError(() => of({ error: 'Location data error!' }))
    )
  }

  getLocationTemperature({ longitude, latitude }: TodoLocationResultDto): Observable<number> {
    return this.httpClient.get<TodoLocationTemperatureDto>(`https://api.open-meteo.com/v1/forecast?latitude=${ latitude }&longitude=${ longitude }&current=temperature_2m`).pipe(
      map(({ current }) => current.temperature_2m),
      catchError(err => of(NaN)),
    )
  }
}
