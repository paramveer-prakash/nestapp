import { HttpModule, Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { SCMService } from './scmservice/scm.service';

@Module({
  imports: [HttpModule,CoreModule],
  providers: [SCMService],
  exports: [SCMService]
})
export class ExtServicesModule {}
