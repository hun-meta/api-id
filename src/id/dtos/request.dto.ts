import { IsNotEmpty, IsString } from 'class-validator';

// Snowflake ID Response DTO
export class GenerateIdDTO {
    @IsNotEmpty()
    @IsString()
    table: string; // table name
}
