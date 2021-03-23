import { HttpModule, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CoreModule } from './core/core.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ExtServicesModule } from './ext-services/ext-services.module';

@Module({
  imports: [ 
    CoreModule,
    ExtServicesModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 60,
    }),
    UserModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ]
})
export class AppModule {}
