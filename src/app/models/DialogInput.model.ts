export class DialogInput
{
    constructor(confirmed: boolean, content: string = "")
    {
        this.confirmed = confirmed;
        this.content = content;
    }

    public confirmed: boolean;
    public content: string;
}