export class AppUser
{
    constructor(username: string = "", email: string = "", password: string = "")
    {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public username: string;
    public email: string;
    public password: string;
}