import { Component, OnInit } from '@angular/core';
import { LanguageDropdown } from 'src/app/models/dropdown/language-dropdown.model';
import * as locale from 'src/app/common/constants/language.constants';
import { TranslationService } from 'src/app/services/translation/translation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {

    public languageDropdownConfig: any;
    public supportedLanguages: LanguageDropdown[];
    public selectedLanguage: LanguageDropdown;
    
    constructor(private translationService: TranslationService) 
    { 
        this.bootstrap();
        this.translationService.update.subscribe(update => {
            if (environment.production == false)
                console.log("bootstrap language switch subscribed");

            this.bootstrap();
        });
    }

    ngOnInit(): void 
    {}
    
    public handleTranslations(): void
    {
        if(this.selectedLanguage.code == undefined)
            this.selectedLanguage = this.translationService.supportedLanguages
                .find(s => s.code == locale.defaulLanguage);

        this.translationService.setLanguage(this.selectedLanguage.code);
        this.translationService.saveSelectedLanguage(this.selectedLanguage.code);
    }

    private bootstrap(): void
    {
        this.languageDropdownConfig = this.translationService.getSettings('name');
        this.supportedLanguages = this.translationService.supportedLanguages;
        this.selectedLanguage = this.translationService.GetSelectedLanguage();
    }

}
