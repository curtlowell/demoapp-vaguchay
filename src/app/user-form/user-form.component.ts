import { Component, OnInit, NgZone} from '@angular/core'
import { Router, ActivatedRoute} from '@angular/router'
import { FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective, NgForm } from "@angular/forms"
import { ErrorStateMatcher } from '@angular/material/core'

import { MatSnackBar } from '@angular/material/snack-bar'

import { UserService } from '../services/api/user/user.service'
import { User } from '../model/user'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted))
  }
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  title = 'User Form'
  submitted = false
  userForm: FormGroup
  userId: string = null
  user: User = {
    user_fullname: '',
    user_email: '',
    user_address: ''
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchUser()
    this.mainForm()
  }

  fetchUser() {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId')
      if (!this.userId) {
        return
      }

      this.userService.getUser(this.userId)
        .subscribe(user => (this.user = user))
    })

  }

  mainForm() {
    this.userForm = this.fb.group({
      user_fullname: ['', [Validators.required]],
      user_email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      user_address: ['', [Validators.required]],
    })
  }

  onSubmit() {
    this.submitted = true
    if (!this.userForm.valid) {
      return false
    } else {

      const actionType = !this.userId ? { func: 'createUser', text: 'created' } : { func: 'updateUser', text: 'updated' }
      this.userService[actionType.func](this.user as User)
        .subscribe(
          (res) => {
            this._snackBar.open(`User successfully ${actionType.text}`, '',{
              duration: 3000
            })

            this.ngZone.run(() => this.router.navigateByUrl(''))

          }, (error) => {
            console.log(error)
          })
    }
  }

  errorMatcher = new MyErrorStateMatcher()
}
