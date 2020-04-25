import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Observable, of, throwError } from 'rxjs'
import { catchError, tap, map } from 'rxjs/operators'

import { User } from '../../../model/user'
import { ConstantsService } from '../../common/constants.service'

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url: string
  options: {}
  userId: string

  constructor(private http: HttpClient, private _constant: ConstantsService) { 
    this.url = this._constant.baseUrl
    this.options = this._constant.httpOptions
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
      .pipe(
        tap(user => console.log('users fetched')),
        catchError(this.errorHandling('getUsers', []))
      )
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user, this.options)
      .pipe(
        tap((user: User) => console.log('user saved', user)),
        catchError(this.errorHandling<User>('createUser'))
      )
  }

  getUser(id: string): Observable<User> {
    const url = `${this.url}/${id}`

    return this.http.get<User>(url).pipe(
      tap(() => console.log(`user fetched ${id}`)),
      catchError(this.errorHandling<User>(`getUser id=${id}`))
    )
  }

  updateUser(user: User): Observable<any> {
    const url = `${this.url}/${user._id}`

    return this.http.put(url, user, this.options).pipe(
      tap(_ => console.log(`updated ${user._id}`)),
      catchError(this.errorHandling<any>('updateUser'))
    )
  }

  deleteUser(id: any): Observable<User> {
    const url = `${this.url}/${id}`

    return this.http.delete<User>(url, this.options)
      .pipe(
        tap(_ => console.log(`user deleted`)),
        catchError(this.errorHandling<User>('deleteUser'))
      )
  }

  private errorHandling<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T)
    }
  }

}
