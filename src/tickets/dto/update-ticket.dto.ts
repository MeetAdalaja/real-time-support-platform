import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TicketCategory, TicketPriority, TicketStatus } from "../tickets.types";

export class UpdateTicketDTO {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(TicketPriority)
    priority?: TicketPriority;

    @IsOptional()
    @IsEnum(TicketCategory)
    category?: TicketCategory;

    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @IsOptional()
    @IsString()
    assigneeId?: string; // should be from registered users - check it later
}