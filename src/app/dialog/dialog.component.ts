import { Component, OnInit, Inject } from '@angular/core'

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  modalProperties = {
    title: '',
    content: '',
    event: ''
  }

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.modalProperties = this.data
  }

  onYesClick() {
    this.dialogRef.close({event: this.data.event})
  }

  onNoClick(): void{
    this.dialogRef.close()
  }

}
