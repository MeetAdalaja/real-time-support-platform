import { Module } from "@nestjs/common";
import { TicketController } from "./tickets.controller";
import { TicketService } from "./tickets.service";


@Module({
    imports: [],
    controllers: [TicketController],
    providers: [TicketService],
    exports: []
})

export class TicketModule {}