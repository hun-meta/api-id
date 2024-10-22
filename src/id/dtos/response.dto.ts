import { IsNotEmpty, IsString } from 'class-validator';

// Snowflake ID Response DTO
export class GenerateIdResDto {

    @IsNotEmpty()
    @IsString()
    table: string; // table name

    @IsNotEmpty()
    @IsString()
    id: string; // snowflake id

    static create(table: string, id: string): GenerateIdResDto {
        const dto = new GenerateIdResDto();
        dto.table = table;
        dto.id = id;

        return dto;
    }
}