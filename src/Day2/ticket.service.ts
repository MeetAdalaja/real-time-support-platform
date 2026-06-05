import type { Ticket } from "../types/ticket.types.js";
const { promise, resolve, reject } = Promise.withResolvers();


export class TicketService {
    tickets: Ticket[] = []

    async createTicket(input: Ticket): Promise<Ticket> {
        try {
            // 1. validation
            if (!input.title || input.title == "") {
                console.log("Title is mandatory")
                throw new Error("Title is mandatory")
            }

            if (!input.priority || !(input.priority === "low" || input.priority === "medium" || input.priority === "high" || input.priority === 'critical')) {
                console.log(input.priority)
                console.log("Ticket Priority input is invalid")
                throw new Error("Ticket Priority input is invalid")
            }

            if (!input.category || !(input.category === "billing" || input.category === "technical" || input.category === "account" || input.category === "bug" || input.category === "feature_request" || input.category === "incident")
            ) {
                console.log("Ticket Category input is invalid")
                throw new Error("Ticket Category input is invalid")
            }

            // 3. Create a new ticket object
            const newTicket: Ticket = {
                // "id": crypto.randomUUID(),
                "id": "3",
                "title": input.title,
                "description": input.description,
                "priority": input.priority,
                "status": "open",
                "category": input.category,
                "requesterEmail": input.requesterEmail,
                ...(input.assigneeId && { assigneeId: input.assigneeId }),
                "createdAt": new Date(),
                "updatedAt": new Date(),
            }

            // 7. Push ticket into tickets array
            this.tickets.push(newTicket)

            // 8. Return created ticket
            return newTicket
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async listTickets(filters: Partial<Ticket>): Promise<Ticket[] | string> {
        try {
            const filteredTickets = this.tickets.filter(i => i.priority === filters.priority);

            if (filteredTickets.length > 0) {
                // Tickets are available, proceed to display/return them
                return filteredTickets;
            } else {
                // No tickets found, show your message
                return "there is no Tickets available as per your filter";
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async getTicketById(id: string): Promise<Ticket[] | string> {
        try {
            const ticketById = this.tickets.filter(i => i.id === id);

            if (ticketById.length > 0) {
                return ticketById;
            } else {
                // No tickets found, show your message
                return `there is no Ticket with this ${id}`;
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async updateTicketStatus(id: string, status: string): Promise<Ticket | string> {
        try {
            const ticketById = this.tickets.find(i => i.id === id);

            if (ticketById) {
                // Check if new status is valid.
                if (!status || !(status === "open" || status === "assigned" || status === "waiting_on_customer" || status === "escalated" || status === "resolved" || status === "closed")
                ) {
                    console.log("Ticket Status input is invalid")
                    throw new Error("Ticket Status input is invalid")
                }

                // If current status is closed and new status is open, reject it.
                if (ticketById.status === "closed" && status === "open") {
                    console.log("You can not open Closed Ticket - Create new Ticket")
                    throw new Error("You can not open Closed Ticket - Create new Ticket")
                }

                ticketById.status = status;
                ticketById.updatedAt = new Date();

                console.log(this.tickets)
                return ticketById
            } else {
                // No tickets found, show your message
                return `there is no Ticket with this ${id}`;
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    async assignTicket(id, assigneeId) {
        try {
            const ticketById = this.tickets.find(i => i.id === id);

            if (ticketById && assigneeId) {
                ticketById.assigneeId = assigneeId;
                if (ticketById?.status === "open") {
                    ticketById.status = "assigned"
                }
                ticketById.updatedAt = new Date();

                console.log(this.tickets)
                return ticketById
            } else {
                // No tickets found, show your message
                return `there is no Ticket with this ${id}`;
            }
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

}