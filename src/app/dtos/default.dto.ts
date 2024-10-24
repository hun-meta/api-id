import { IsString } from 'class-validator';

export class DefaultDTO {
    @IsString()
    responseStr: string;

    static create(datetime: string): DefaultDTO {
        const dto = new DefaultDTO();
        dto.responseStr = datetime;
        return dto;
    }
}

export class HealthCheckDTO {
    @IsString()
    datetime: string;

    static create(datetime: string): HealthCheckDTO {
        const dto = new HealthCheckDTO();
        dto.datetime = datetime;
        return dto;
    }
}
