import { Module } from '@nestjs/common';
import { ApiLogger } from './logging/apilogger';

@Module({
    providers:[ApiLogger],
    exports: [ApiLogger]
})
export class CoreModule {}
