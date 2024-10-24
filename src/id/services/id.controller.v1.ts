import { Controller, Post, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenerateIdDTO } from '../dtos/request.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SnowflakeIdService } from './snowflake-id.service';
import { ID_CREATED } from '../constants/response-info.constants';
import { GenerateIdResDTO } from '../dtos/response.dto';
import { GEN_ID_OPTS } from '../swagger/swagger.metadata';

@ApiBearerAuth()
@Controller('v1')
@UsePipes(new ValidationPipe({ transform: true }))
export class IdController {
    constructor(
        private readonly snowflakeIdService: SnowflakeIdService,
        private readonly logger: LoggerService,
    ) {
        this.logger.setContext(IdController.name);
    }

    // Generate Table ID API
    @Post(':table/ids')
    @CustomSwaggerDecorator(GEN_ID_OPTS)
    async generateId(@Param() params: GenerateIdDTO): Promise<ControllerResponse<GenerateIdResDTO>> {
        const responseDto = await this.snowflakeIdService.generateId(params);
        const response = ControllerResponse.create<GenerateIdResDTO>(ID_CREATED, responseDto);

        return response;
    }
}
