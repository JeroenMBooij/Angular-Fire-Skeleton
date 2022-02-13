export class ServiceMessage
{
    constructor(success: boolean, content: string)
    {
        this.success = success;
        this.content = content;
    }

    public success: boolean;
    public content: string;
}