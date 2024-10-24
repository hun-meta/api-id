import { Injectable } from '@nestjs/common';
import { DefaultDTO, HealthCheckDTO } from '../dtos/default.dto';

@Injectable()
export class AppService {
    constructor() {}

    getDefaultResponse(): DefaultDTO {
        const welcomeStr = 'Welcome to API - Auth\n';
        const currentDate = new Date();
        const curDatetime = currentDate.toISOString();
        const responseStr = welcomeStr + curDatetime;

        return DefaultDTO.create(responseStr);
    }

    getHealth(): HealthCheckDTO {
        const currentDate = new Date();
        const curDatetime = currentDate.toISOString();

        return HealthCheckDTO.create(curDatetime);
    }
}