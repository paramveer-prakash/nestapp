import { HttpModule, HttpService } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { CoreModule } from '../../core/core.module';
import { UserNotFoundException } from './exceptions/usernotfoundexception';
import { SCMService } from './scm.service';
import { AxiosResponse } from "axios";

const repoData: any = [{
  "id": 1,
  "name": "repo-1",
  "fork": false,
  "owner": {
    "login": "validuser"
  }
},
{
  "id": 2,
  "name": "repo-2",
  "fork": true,
  "owner": {
    "login": "validuser"
  }
},
{
  "id": 3,
  "name": "repo-3",
  "fork": false,
  "owner": {
    "login": "validuser"
  }
}
];

const mockRepositoryResponse: AxiosResponse<any> = {
  data: repoData,
  headers: {},
  config: { url: 'http://localhost:3000/mockUrl' },
  status: 200,
  statusText: 'OK',
};


const branchesData: any = [{
  "name": "b1.0",
  "commit": {
    "sha": "a4aa5b0a4373ff39067882eb20aee41a27a1afdc",
    "url": "https://api.github.com/repos/validuser/repo/commits/a4aa5b0a4373ff39067882eb20aee41a27a1afdc"
  },
  "protected": false
},
{
  "name": "b1.0",
  "commit": {
    "sha": "a4aa5b0a4373ff39067882eb20aee41a27a1afdc",
    "url": "https://api.github.com/repos/validuser/repo/commits/a4aa5b0a4373ff39067882eb20aee41a27a1afdc"
  },
  "protected": false
},
{
  "name": "b1.0",
  "commit": {
    "sha": "a4aa5b0a4373ff39067882eb20aee41a27a1afdc",
    "url": "https://api.github.com/repos/validuser/repo/commits/a4aa5b0a4373ff39067882eb20aee41a27a1afdc"
  },
  "protected": false
}
]

const mockBranchesResponse: AxiosResponse<any> = {
  data: branchesData,
  headers: {},
  config: { url: 'http://localhost:3000/mockUrl' },
  status: 200,
  statusText: 'OK',
};

describe('SCMServiceService', () => {
  let scmService: SCMService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SCMService],
      imports: [HttpModule, CoreModule]
    }).compile();

    scmService = module.get<SCMService>(SCMService);
    httpService = module.get<HttpService>(HttpService);
  });


  it('should be defined', () => {
    expect(scmService).toBeDefined();
  });


  it('should return user repositories for valid user', () => {
    jest.spyOn(httpService, "get").mockImplementationOnce(() => of(mockRepositoryResponse));
    return scmService.getUserRepositories("validuser").then(data => {
      expect(data.repositories).toBeDefined();
    });
  });


  it('should return UserNotFoundException for invalid user', () => {
    const userName = "cantbeanyuser";
    expect.assertions(1);
    return scmService.getUserRepositories(userName)
      .catch(e => expect(e).toStrictEqual(new UserNotFoundException()));
  });



  it('should not return forked repository for a valid user', async () => {

    jest.spyOn(httpService, "get").mockImplementationOnce(() => of(mockRepositoryResponse));
    const response = await scmService.getUserRepositories("validUser");
    const userRepos = response.repositories;
    for (const repo of userRepos) {
      expect(repo.name).not.toEqual('repo-2');
    }
  })

  it('should return brances for given repository name and user name', async()=>{
    jest.spyOn(httpService, "get").mockImplementationOnce(() => of(mockBranchesResponse));
    return scmService.getBranches("validRepoName","validUser").then(branches =>{
      expect(branches).toBeDefined();
      branches.forEach(branch => {
        expect(branch.name).toBeDefined();
        expect(branch.sha).toBeDefined();
      });
    })
  })
  
});
