import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { AppModule } from '../app.module'

import { UserFormComponent } from './user-form.component'

describe('UserFormComponent', () => {
  let component: UserFormComponent
  let fixture: ComponentFixture<UserFormComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        AppModule
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('form invalid when empty', () => {
      expect(component.userForm.valid).toBeFalsy()
  })

  it('email field validity', () => {
    let errors = {}
    let email = component.userForm.controls['user_email']
    expect(email.valid).toBeFalsy()

    // Email field is required
    errors = email.errors || {}
    expect(errors['required']).toBeTruthy()

    // Set email to something
    email.setValue("test")
    errors = email.errors || {}
    expect(errors['required']).toBeFalsy()
    expect(errors['pattern']).toBeTruthy()

    // Set email to something correct
    email.setValue("test@example.com")
    errors = email.errors || {}
    expect(errors['required']).toBeFalsy()
    expect(errors['pattern']).toBeFalsy()
  }) 

  it('address field validity', () => {
    let errors = {}
    let address = component.userForm.controls['user_address']
    expect(address.valid).toBeFalsy()

    errors = address.errors || {}
    expect(errors['required']).toBeTruthy()
  })

  it('name field validity', () => {
    let errors = {}
    let name = component.userForm.controls['user_fullname']
    expect(name.valid).toBeFalsy()

    errors = name.errors || {}
    expect(errors['required']).toBeTruthy()
  })

})
