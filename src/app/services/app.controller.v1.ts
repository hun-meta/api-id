import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { DefaultDTO, HealthCheckDTO } from '../dtos/default.dto';
import { SUCCESS_RES } from '../constants/response-info.constants';
import { Public } from 'src/common/request/request.guard';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { GET_DEFAULT_RES_OPTS, GET_HEALTH_OPTS } from '../swagger/swagger.metadata';

@Controller()
@UsePipes(new ValidationPipe({ transform: true }))
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Public()
    @Get()
    @CustomSwaggerDecorator(GET_DEFAULT_RES_OPTS)
    getDefaultResponse(): ControllerResponse<DefaultDTO> {
        const data = this.appService.getDefaultResponse();
        const response = ControllerResponse.create<DefaultDTO>(SUCCESS_RES, data);

        return response;
    }

    @Public()
    @Get('v1/health')
    @CustomSwaggerDecorator(GET_HEALTH_OPTS)
    getHealth(): ControllerResponse<HealthCheckDTO> {
        const data = this.appService.getHealth();
        const response = ControllerResponse.create<HealthCheckDTO>(SUCCESS_RES, data);

        return response;
    }
}
