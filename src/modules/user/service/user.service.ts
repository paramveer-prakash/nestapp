import { Injectable, Logger } from '@nestjs/common';
import { SCMService } from '../../ext-services/scmservice/scm.service';
import { ApiLogger } from '../../core/logging/apilogger';

@Injectable()
export class UserService {

    private readonly logger = new Logger(UserService.name);

    constructor(
      private readonly scmService: SCMService,
      private readonly apiLogger: ApiLogger) {}

    getUserRepositories(username) {
      return this.scmService.getUserReposWithBranches(username);
    }

}
