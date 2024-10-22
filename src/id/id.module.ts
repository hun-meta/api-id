import { Module } from '@nestjs/common';
import { SnowflakeIdService } from './services/snowflake-id.service';
import { IdController } from './services/id.controller.v1';
import { LoggerService } from 'src/common/logger/logger.service';

@Module({
    imports: [],
    controllers: [IdController],
    providers: [SnowflakeIdService, LoggerService],
})
export class IdModule {}