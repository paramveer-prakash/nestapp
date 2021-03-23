import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExtServicesModule } from '../../ext-services/ext-services.module';
import { CoreModule } from '../../core/core.module';
import { UserService } from './user.service';
import { SCMService } from '../../ext-services/scmservice/scm.service';
import { UserRepositories } from '../../ext-services/scmservice/model/userrepositories';
import { UserNotFoundException } from '../../ext-services/scmservice/exceptions/usernotfoundexception';

const mockUserRepositoriesResponse: UserRepositories = {
  "repositories":[
        {
          "branches": [
              {
                  "name": "main",
                  "sha": "cca990a85a841175e1cf46d6a07a9c159c799ca9"
              }
          ],
          "name": "repo1",
          "ownerLogin": "validuser"
        }
    ]
}
jest.mock('../../ext-services/scmservice/scm.service');
describe('UserService', () => {
  let userService: UserService;
  let scmService: SCMService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
      imports:[HttpModule,CoreModule,ExtServicesModule]
    }).compile();

    userService = module.get<UserService>(UserService);
    scmService = module.get<SCMService>(SCMService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should call the scm service', () => {
    userService.getUserRepositories("validuser");
    expect(scmService.getUserReposWithBranches).toHaveBeenCalled();
  });

  it('should return repositories for valid user',()=>{
    jest.spyOn(scmService, "getUserReposWithBranches").mockImplementationOnce(() => Promise.resolve(mockUserRepositoriesResponse));
    return userService.getUserRepositories("validuser").then(userRepos=>{
      userRepos.repositories.forEach(r=>{
        expect(r.name).toEqual("repo1");
      })
    })
  });

});


