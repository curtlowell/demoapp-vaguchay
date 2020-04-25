import { TestBed, async, inject } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient, HttpResponse } from '@angular/common/http'

import { UserService } from './user.service'
import { User } from '../../../model/user'
import { ConstantsService } from '../../common/constants.service'

describe('UserService', () => {
  let service: UserService
  let httpMock: HttpTestingController
  let httpClient: HttpClient
  let constants: ConstantsService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        ConstantsService
      ]
    })

    httpClient = TestBed.inject(HttpClient)
    service = TestBed.inject(UserService)
    constants = TestBed.inject(ConstantsService)
    httpMock = TestBed.get(HttpTestingController)
    
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it(`should fetch users`, () => {
    const userItem = [
      {
        '_id': '1',
        'user_fullname': 'Curt Lowell D. Vaguchay',
        'user_email': 'curtlowell19@gmail.com',
        'user_address': 'Manolo Fortich Bukidnon',
        'updated_at': Date.now
      }
    ]

    service.getUsers()
      .subscribe((users: any) => {
        expect(users.length).toBe(1)
      })
    
    let req = httpMock.expectOne(constants.baseUrl)
    expect(req.request.method).toBe('GET')

    req.flush(userItem)
    httpMock.verify
  })

  it(`should add new user`, () => {
    const newUser: User = { 
      'user_fullname': 'Curt Lowell D. Vaguchay',
      'user_email': 'curtlowell19@gmail.com',
      'user_address': 'Manolo Fortich Bukidnon'
    }

    service.createUser(newUser)
      .subscribe(
        data => expect(data).toEqual(newUser, 'should return the user'),
        fail
      )

      const req = httpMock.expectOne(constants.baseUrl)
      expect(req.request.method).toBe('POST')

      expect(req.request.body).toEqual(newUser)

      const expectedResponse = new HttpResponse({ status: 200, statusText: 'User Created', body: newUser })
      req.event(expectedResponse)
  })

  it(`should fetch a single user by id`, () => {
    const userId: string = '1'
    const userItem: User[] = [
      {
        '_id': '1',
        'user_fullname': 'Curt Lowell D. Vaguchay',
        'user_email': 'curtlowell19@gmail.com',
        'user_address': 'Manolo Fortich Bukidnon'
      }
    ]

    service.getUser(userId)
      .subscribe((user: any) => {
        expect(user.length).toBe(1)
        expect(user[0].user_fullname).toBe('Curt Lowell D. Vaguchay')
        expect(user[0].user_email).toBe('curtlowell19@gmail.com')
        expect(user[0].user_address).toBe('Manolo Fortich Bukidnon')
      })

    const req = httpMock.expectOne(constants.baseUrl+'/1')
    expect(req.request.method).toBe("GET")

    req.flush(userItem)
    httpMock.verify()
  })

})
