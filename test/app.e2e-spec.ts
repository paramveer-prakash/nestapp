import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/modules/app.module';


describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return 200 status code for valid user', () => {
    const userName = "validuser";
    return request(app.getHttpServer())
      .get('/user/'+userName+'/repositories')
      .expect(200);
  });

  it('should not have forked repositories', async ()=>{
    const userName = "paramveer-prakash";
    const forkedRepo = "intershop-pwa";
    const response = await request(app.getHttpServer())
      .get('/user/'+userName+'/repositories')
      .expect(200);
      const userRepos = response.body.repositories;
      for (const repo of userRepos) {
        expect(repo.name).not.toEqual(forkedRepo);
      } 
  })

  it('should return 404 status code for invalid user', () => {
    const userName = "cantbeanyuser";
    return request(app.getHttpServer())
      .get('/user/'+userName+'/repositories')
      .expect(404);
  });

  it('should return 406 status code for invalid Header [Accept]', () => {
    const userName = "cantbeanyuser";
    return request(app.getHttpServer())
      .get('/user/'+userName+'/repositories')
      .set('Accept','application/xml')
      .expect(406);
  });
  
});
