import type {Ticket, PaginatedResponse} from "./types/ticket.types.js";

const exampleTicket: Ticket = {
    id: "12345",
    title: "Unable to login to account",
    description: "I am unable to login to my account since yesterday. It keeps showing an error message.",
    priority: "high",
    status: "open",
    category: "technical",
    requesterEmail: "user@example.com",
    createdAt: new Date(),
    updatedAt: new Date()
};

const PaginatedTicketsResponse: PaginatedResponse<Ticket> = {
    data: [exampleTicket],
    page: 1,
    limit: 10,
    total: 1
};

console.log("Example Ticket:", exampleTicket);
console.log("Paginated Tickets Response:", PaginatedTicketsResponse);