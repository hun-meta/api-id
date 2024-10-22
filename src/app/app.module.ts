import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './services/app.controller.v1';
import { AppService } from './services/app.service';
import { winstonLogger } from 'src/common/logger/logger.config';
import { IdModule } from 'src/id/id.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionsFilter } from 'src/common/exception/global-exception.filter';
import { RequestGuard } from 'src/common/request/request.guard';
import { ResponseInterceptor } from 'src/common/response/interceptor/response.interceptor';
import { LoggerService } from 'src/common/logger/logger.service';
import { ClsMiddleware, ClsModule } from 'nestjs-cls';
import { ConfigModule } from '@nestjs/config';
import { RequestIdMiddleware } from 'src/common/request/request-id.middleware';

@Module({
  imports: [
      ClsModule.forRoot({
          global: true,
          middleware: { mount: true }
      }),
      ConfigModule.forRoot({
          envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
          isGlobal: true
      }),
      winstonLogger,
      IdModule
  ],
  controllers: [AppController],
  providers: [
      {
          provide: APP_FILTER,
          useClass: GlobalExceptionsFilter
      },
      {
          provide: APP_GUARD,
          useClass: RequestGuard
      },
      {
          provide: APP_INTERCEPTOR,
          useClass: ResponseInterceptor
      },
      LoggerService,
      AppService
  ],
  exports: [
      LoggerService
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
      consumer
          .apply(ClsMiddleware, RequestIdMiddleware) // ClsMiddleware가 먼저 동작하도록 설정
          .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
