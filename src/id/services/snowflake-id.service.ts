import { BadRequestException, Injectable } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';
import { GenerateIdResDTO } from '../dtos/response.dto';
import { GenerateIdDTO } from '../dtos/request.dto';
import { ConfigService } from '@nestjs/config';
import { LoggerService } from 'src/common/logger/services/logger.service';
import { EnvUndefinedError } from 'src/common/exception/errors';

@Injectable()
export class SnowflakeIdService {
    private snowflakes: Map<string, SnowflakeId>;
    private machineId: number;

    constructor(
        private readonly configService: ConfigService,
        private readonly logger: LoggerService
    ) {
        this.logger.setContext(SnowflakeIdService.name);
        this.snowflakes = new Map();
        this.machineId = this.getMachineId();
        this.initializeSnowflakes();
    }

    /**
     * get Machine ID by using IP address for SnowflakeID
     *
     * @returns Machine ID
     */
    private getMachineId(): number {
        const ipAddress = process.env.HOST_IP;
        const parts = ipAddress.split('.');
    
        if(parts.length < 4){
            throw new EnvUndefinedError(['HOST_IP']);
        }

        const thirdOctet = parseInt(parts[2]);
        const machineIdPart1 = thirdOctet & 0b11;
    
        const machineIdPart2 = parseInt(parts[3]);
    
        return machineIdPart1 * 256 + machineIdPart2;
    }    

    /**
     * Initialize snowflakes for each tables
     */
    private initializeSnowflakes() {

        const tables = this.configService.get<string>('SNOWFLAKE_TABLES')?.split(',') || [];
        tables.forEach((table) => {
            this.snowflakes.set(
                table.trim(),
                new SnowflakeId({
                    mid: this.machineId,
                    offset: (2024 - 1970) * 31536000 * 1000,
                }),
            );
        });
    }

    /**
     * generate snowflake id
     *
     * @returns snowflake id as a dto
     */
    generateId(genIdDto: GenerateIdDTO): GenerateIdResDTO {
        const table = genIdDto.table;

        const snowflake = this.snowflakes.get(table);
        if (!snowflake) {
            throw new BadRequestException(`No Snowflake instance for table: ${table}`);
        }

        const id = snowflake.generate().toString();
        const dto = GenerateIdResDTO.create(table, id);

        return dto;
    }

    /**
     * get all settled tables from snowflakes
     *
     * @returns tables array
     */
    getConfiguredTables(): string[] {
        return Array.from(this.snowflakes.keys());
    }
}
