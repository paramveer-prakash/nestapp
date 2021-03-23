import { Branch } from "./branch";

export class Repo{
    name:string;
    ownerLogin:string;
    branches:Branch[]=[];

    constructor(name: string, ownerLogin: string) {
        this.name = name;
        this.ownerLogin = ownerLogin;
   }
}