import { Controller, Post, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { GenerateIdDto } from '../dtos/request.dto';
import { ControllerResponse } from 'src/common/response/dto/controller-response.dto';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { CustomSwaggerDecorator } from 'src/common/decorator/swagger.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SnowflakeIdService } from './snowflake-id.service';
import { ID_CREATED } from '../constants/response-info.constants';
import { GenerateIdResDto } from '../dtos/response.dto';
import { generateIdOpts } from '../swagger/swagger.metadata';

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
    @CustomSwaggerDecorator(generateIdOpts)
    async generateId(@Param() params: GenerateIdDto): Promise<ControllerResponse<GenerateIdResDto>> {
        const responseDto = await this.snowflakeIdService.generateId(params);
        const response = ControllerResponse.create<GenerateIdResDto>(ID_CREATED, responseDto);

        return response;
    }
}
