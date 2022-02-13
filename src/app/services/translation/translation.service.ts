import { Injectable } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject } from 'rxjs';
import * as locale from 'src/app/common/constants/language.constants';
import * as lsKeys from 'src/app/common/constants/localstorage.constants';
import { LanguageDropdown } from "src/app/models/dropdown/language-dropdown.model";


@Injectable({
  providedIn: 'root'
})
export class TranslationService {

    public supportedLanguages: LanguageDropdown[];
    public update: BehaviorSubject<any> = new BehaviorSubject("");

    private translate: TranslateService;

    constructor(translate: TranslateService)
    {
        this.translate = translate;
        this.supportedLanguages = locale.supportedLanguages;
    }

    
    public setLanguage(code: string): void
    {
        this.translate.use(code);
    }

    
    public get(key: string): string
    {
        return this.translate.instant(key);
    }

    public getSettings(displayKey: string): any
    {
        return {
            displayKey: displayKey, //if objects array passed which key to be displayed defaults to description
            search:true, //true/false for the search functionlity defaults to false,
            height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
            placeholder:this.translate.instant('dropdown.select'), // text to be displayed when no item is selected defaults to Select,
            customComparator: ()=>{}, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
            limitTo: 0, // number thats limits the no of options displayed in the UI (if zero, options will not be limited)
            moreText: this.translate.instant('dropdown.more'), // text to be displayed whenmore than one items are selected like Option 1 + 5 more
            noResultsFound: this.translate.instant('dropdown.noResults'), // text to be displayed when no items are found while searching
            searchPlaceholder: this.translate.instant('dropdown.search'), // label thats displayed in search input,
            searchOnKey: displayKey // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
        }
    }

    public GetSelectedLanguage(): LanguageDropdown
    {
        let selectedLanguage = locale.supportedLanguages.find(s => s.code == this.translate.currentLang);

        if(selectedLanguage == undefined)
            selectedLanguage  = locale.supportedLanguages.find(s => s.code == localStorage.getItem(lsKeys.languageKey));
        if(selectedLanguage == undefined)
            selectedLanguage  = locale.supportedLanguages.find(s => s.code == locale.defaulLanguage);
        if(selectedLanguage == undefined)
            throw Error("no language set");
        
        return selectedLanguage;
    }

    public saveSelectedLanguage(code: string): void
    {
        localStorage.setItem(lsKeys.languageKey, code);
        this.update.next("");
    }

    public bootstrap(): void
    {
        this.translate.addLangs(['en', 'nl', 'zh']);
        this.translate.setDefaultLang('en');
        this.translate.use(this.GetSelectedLanguage().code);
    }
}
