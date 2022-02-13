import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { ConfirmationDialogComponent } from 'src/app/components/shared/confirmation-dialog/confirmation-dialog.component';
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class HelpInfoService {

    constructor(
        private translationService: TranslationService,
        private dialog: MatDialog) { }

    public open(translationKey: string)
    {
        this.dialog.open(ConfirmationDialogComponent, {
            width: "600px",
            data: { 
                title: `<mat-icon svgIcon='my-info' class="fade-icon mt-5 ml-4"></mat-icon> ${this.translationService.get('signpost.info')}`,
                customTitleComponent: MatIcon,
                message: this.translationService.get(translationKey),
                confirmation: false,
                confirmLabel: this.translationService.get('input.ok')
            }
        });
    }
}
