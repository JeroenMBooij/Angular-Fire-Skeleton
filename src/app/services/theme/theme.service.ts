import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import 
{ 
    DARK_THEME_COLOR, 
    DARK_THEME_INDEX, 
    LIGHT_THEME_COLOR, 
    LIGHT_THEME_INDEX, 
    THEME_LIST, 
    LIGHT_THEME_BACK_COLOR,
    DARK_THEME_BACK_COLOR
} from "src/app/common/constants/theme.constants";
import { TranslationService } from '../translation/translation.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService 
{

    public update: BehaviorSubject<any> = new BehaviorSubject("");
    public addButton: BehaviorSubject<any> = new BehaviorSubject("");

    public themeMath: BehaviorSubject<any> = new BehaviorSubject("");
    public themeReading: BehaviorSubject<any> = new BehaviorSubject("");
    public themeWriting: BehaviorSubject<any> = new BehaviorSubject("");
    public themeCustom: BehaviorSubject<any> = new BehaviorSubject("");


    
    constructor(private translationService: TranslationService) { }


    public bootstrap()
    {
        let selectedTheme = localStorage.getItem('theme');
        this.setTheme(selectedTheme);
    }

    public get(): string
    {
        return localStorage.getItem('theme');
    }

    public switch(): string
    {
        let selectedThemeKey = localStorage.getItem('theme');
        let newTheme = THEME_LIST.find(s => s != selectedThemeKey);
        selectedThemeKey = this.setTheme(newTheme);

        return selectedThemeKey
    }

    public removeTheme(): void
    {
        THEME_LIST.forEach(theme => {
            document.body.classList.remove(theme);
        }); 
    }

    public setTheme(selectedTheme: string): string
    {
        this.removeTheme();

        let newTheme: string;
        if(THEME_LIST.includes(selectedTheme))
        {
            document.body.classList.add(selectedTheme);
            
            localStorage.setItem("theme", selectedTheme);

            newTheme =  selectedTheme;
        }
        else
        {
            document.body.classList.add(THEME_LIST[0]);
            
            localStorage.setItem("theme", THEME_LIST[0]);

            newTheme =  THEME_LIST[0];
        }

        switch(newTheme)
        {
            case THEME_LIST[LIGHT_THEME_INDEX]:
                document.documentElement.style.setProperty('--my-theme-color', LIGHT_THEME_COLOR);
                document.documentElement.style.setProperty('--theme-back-color', LIGHT_THEME_BACK_COLOR);
                this.addButton.next('add-light');

                this.themeMath.next('light-math.png');
                this.themeReading.next('light-reading.png');
                this.themeWriting.next('light-writing.png');
                this.themeCustom.next('light-custom.png');

                break;
            
            case THEME_LIST[DARK_THEME_INDEX]:
                document.documentElement.style.setProperty('--my-theme-color', DARK_THEME_COLOR);
                document.documentElement.style.setProperty('--theme-back-color', DARK_THEME_BACK_COLOR);
                this.addButton.next('add-dark');
                
                this.themeMath.next('dark-math.png');
                this.themeReading.next('dark-reading.png');
                this.themeWriting.next('dark-writing.png');
                this.themeCustom.next('dark-custom.png');
                break;
        }
        
        this.update.next(newTheme);
        return newTheme;
    }
}
