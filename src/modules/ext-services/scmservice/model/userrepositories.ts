import { Repo } from "./repo";

export class UserRepositories {

    repositories:Repo[];

    constructor(repos:Repo[]){
        this.repositories=repos;
    }

}
