import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { TicketCategory, TicketPriority } from "../tickets.types";

export class CreateTicketDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsEnum(TicketPriority)
    priority: TicketPriority;

    @IsNotEmpty()
    @IsEnum(TicketCategory)
    category: TicketCategory;

    @IsNotEmpty()
    @IsEmail()
    requesterEmail: string;
}