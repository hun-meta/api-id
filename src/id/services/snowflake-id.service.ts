import { BadRequestException, Injectable } from '@nestjs/common';
import SnowflakeId from 'snowflake-id';
import { GenerateIdResDto } from '../dtos/response.dto';
import { GenerateIdDto } from '../dtos/request.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SnowflakeIdService {
    private snowflakes: Map<string, SnowflakeId>;
    private machineId: number;

    constructor(
        private readonly configService: ConfigService
    ) {
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
        const ip = require('ip');
        const ipAddress = ip.address();
        const parts = ipAddress.split('.');

        return parseInt(parts[2]) * 256 + parseInt(parts[3]);
    }

    /**
     * Initialize snowflakes for each tables
     */
    private initializeSnowflakes() {
        const tables = this.configService.get<string>('SNOWFLAKE_TABLES')?.split(',') || [];
        tables.forEach(table => {
            this.snowflakes.set(table.trim(), new SnowflakeId({
                mid: this.machineId,
                offset: (2024 - 1970) * 31536000 * 1000,
            }));
        });
    }

    /**
     * generate snowflake id
     *
     * @returns snowflake id as a dto
     */
    generateId(genIdDto: GenerateIdDto): GenerateIdResDto {
        const table = genIdDto.table;

        const snowflake = this.snowflakes.get(table);
        if (!snowflake) {
            throw new BadRequestException(`No Snowflake instance for table: ${table}`);
        }

        const id = snowflake.generate().toString();
        const dto = GenerateIdResDto.create(table, id);

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
