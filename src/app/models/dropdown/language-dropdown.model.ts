
export class LanguageDropdown
{
    constructor(name: string, code: string, imageUrl: string)
    {
        this.name = name;
        this.code = code;
        this.imageUrl = imageUrl;
    }

    public name: string;
    public code: string;
    public imageUrl: string;
}