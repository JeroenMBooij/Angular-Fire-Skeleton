import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogInput } from 'src/app/models/DialogInput.model';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialogComponent implements OnInit 
{
    public title: string = "app";

    public message: string;

    public inputLabel: string;


    public dialogForm = new FormGroup({
        input     : new FormControl('',[
          Validators.required,
        ])
    });

    get input() { return this.dialogForm.get('input') }

    constructor(
        private thisDialogReference: MatDialogRef<InputDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) 
        { 
            this.message = data.message;
            this.inputLabel = data.inputLabel;
            if (data.title)
                this.title = data.title;

        }

    ngOnInit(): void {
    }


    public confirm(): void 
    {
        this.thisDialogReference.close(new DialogInput(true, this.input.value));
    }

    public cancel(): void 
    {
        this.thisDialogReference.close(new DialogInput(false));
    }


}
