import { Injectable } from '@angular/core'
import { HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly baseUrl: string = 'http://localhost:3000/users'
  readonly httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor() { }
}
