import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ExtServicesModule } from '../../ext-services/ext-services.module';
import { CoreModule } from '../../core/core.module';
import { UserService } from '../service/user.service';
import { UserController } from './user.controller';
import { UserRepositories } from '../../ext-services/scmservice/model/userrepositories';

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

jest.mock('../service/user.service');
describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers:[UserService],
      imports:[HttpModule,CoreModule,ExtServicesModule]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });


  it('should call the user service', () => {
    controller.getUserRepositories("validuser");
    expect(userService.getUserRepositories).toHaveBeenCalled();
  });

  it('should return repositories for valid user',()=>{
    expect.assertions(1);
    jest.spyOn(userService, "getUserRepositories").mockImplementationOnce(() => Promise.resolve(mockUserRepositoriesResponse));
    return controller.getUserRepositories("validuser").then(userRepos=>{
      userRepos.repositories.forEach(r=>{
        expect(r.name).toEqual("repo1");
      })
    })
  });

  
});
