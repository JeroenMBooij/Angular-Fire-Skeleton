import { AfterContentInit, Component, ComponentFactoryResolver, ElementRef, Inject, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CANCEL, CONFIRM } from 'src/app/common/constants/angular.constants';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit, AfterContentInit {

    public title: string = "App";

    public customTitleComponent: boolean = false;

    public message: string = "";

    public confirmation: boolean = true;

    public confirmLabel: string;

    constructor(
        private thisDialogReference: MatDialogRef<ConfirmationDialogComponent>,
        private translationService: TranslationService,
        @Inject(MAT_DIALOG_DATA) public data: any) 
        { 
            this.message = data.message;

            if (data.title)
                this.title = data.title;
            if (data.customTitleComponent == true)
                this.customTitleComponent = data.customTitleComponent;

            if (data.confirmation == false)
                this.confirmation = data.confirmation;

            if(data.confirmLabel)
                this.confirmLabel = data.confirmLabel;
            else
                this.confirmLabel = this.translationService.get('input.confirm');

        }
    ngAfterContentInit(): void
    {
    }

    ngOnInit(): void {
    }


    public confirm(): void {
        this.thisDialogReference.close(CONFIRM);
    }

    public cancel(): void {
        this.thisDialogReference.close(CANCEL);
    }

}
