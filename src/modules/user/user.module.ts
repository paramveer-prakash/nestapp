import { HttpModule, Module } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { ExtServicesModule } from '../ext-services/ext-services.module';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  imports:[CoreModule,ExtServicesModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
