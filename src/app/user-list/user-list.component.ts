import { Component, OnInit, ViewChild } from '@angular/core'

import { MatPaginator } from '@angular/material/paginator'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'

import { User } from '../model/user'
import { UserService } from '../services/api/user/user.service'
import { DialogComponent } from "../dialog/dialog.component"

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ['user_fullname', 'user_email', 'user_address', 'updated_at', 'actions']
  data: MatTableDataSource<User>
  message: string
  isEmpty = true

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator
  @ViewChild(MatSort, {static: true}) sort: MatSort

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }
    
  ngOnInit(): void {
    this._renderTable()
  }

  openDeleteDialog(id) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete User',
        content: 'Are you sure you want to delete this user?',
        event: 'delete'
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'delete'){
        this.deleteUser(id)
      }
    })
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(result => {
      this._renderTable()

      this._snackBar.open('User deleted','',{
        duration: 3000
      })
    })
  }


  userSearch(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.data.filter = filterValue.trim().toLowerCase()

    if (this.data.paginator) {
      this.data.paginator.firstPage()
    }
  }

  private _renderTable() {
    this.userService.getUsers()
      .subscribe((users: User[]) => {
        this.data = new MatTableDataSource(users)
        this.data.paginator = this.paginator
        this.data.sort = this.sort
        this.isEmpty = (users.length < 1) ? true : false
      }, err => {
        console.log(err)
      })
  }

}
