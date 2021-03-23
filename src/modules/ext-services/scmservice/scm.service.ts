import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { ApiLogger } from '../../core/logging/apilogger';
import { BRANCHES_URL, REPO_URL } from './constants/scm.constants';
import { UserNotFoundException } from './exceptions/usernotfoundexception';
import { Branch } from './model/branch';
import { Repo } from './model/repo';
import { UserRepositories } from './model/userrepositories';

@Injectable()
export class SCMService {

  
  constructor(
    private readonly httpService: HttpService,
    private readonly apiLogger: ApiLogger) { }

  async getUserReposWithBranches(username) {

    let repos: UserRepositories = await this.getUserRepositories(username);
    for (const repo of repos.repositories) {
      let branches = await this.getBranches(repo.ownerLogin,repo.name);
      repo.branches = branches;
    }
    return repos;
  }


  async getUserRepositories(userName) {
    
    try {
      const url = REPO_URL.replace("{username}", userName);
      let repos = await this.httpService.get<any>(url).pipe(
        map(response => response.data.filter(repo => repo.fork == false).map(repo => new Repo(repo.name, repo.owner.login)))).toPromise();
      return new UserRepositories(repos);
    } catch (e) {
      this.apiLogger.error("Failed to retrieve repository for user "+userName,null);
      throw new UserNotFoundException();
    }
  }


  async getBranches(userName,repoName) {

    try {
      const url = BRANCHES_URL.replace("{username}", userName).replace("{reponame}", repoName);
      return await this.httpService.get<any>(url).pipe(
        map(response => response.data.map(b => new Branch(b.name, b.commit.sha)))
      ).toPromise()
    } catch (e) {
      this.apiLogger.error("Failed to retrieve branches for repository ["+repoName+"] of user ["+userName+"]",null);
    }
    
  }

}
