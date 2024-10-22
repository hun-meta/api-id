import { IsNotEmpty, IsString } from 'class-validator';

// Snowflake ID Response DTO
export class GenerateIdDto {

    @IsNotEmpty()
    @IsString()
    table: string; // table name
    
}