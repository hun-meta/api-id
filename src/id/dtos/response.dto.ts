import { IsNotEmpty, IsString } from 'class-validator';

// Snowflake ID Response DTO
export class GenerateIdResDTO {
    @IsNotEmpty()
    @IsString()
    table: string; // table name

    @IsNotEmpty()
    @IsString()
    id: string; // snowflake id

    static create(table: string, id: string): GenerateIdResDTO {
        const dto = new GenerateIdResDTO();
        dto.table = table;
        dto.id = id;

        return dto;
    }
}
