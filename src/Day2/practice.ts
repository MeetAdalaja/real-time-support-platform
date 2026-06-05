import { TicketService } from "./ticket.service.js";

async function main() {
    // create service object
    const ticketService: any = new TicketService()

    // call createTicket with sample input
    async function create() {
        try {
            let input = {
                "title": "Login page not working",
                "description": "Customer cannot login after password reset",
                "priority": "high",
                "category": "technical",
                "requesterEmail": "customer@example.com"
            }

            const newTicket = await ticketService.createTicket(input)
        } catch (error) {
            console.error("Failed to create ticket:", (error as Error).message);
        }
    }
    create()
    create()
    create()
    create()

    // call listTickets
    async function list(filters) {
        try {
            const allTickets = await ticketService.listTickets(filters)
            // console.log(allTickets)
        } catch (error) {
            console.error("Failed to get all tickets:", (error as Error).message);
        }
    }
    list({ priority: "high" })

    // call getTiecket
    async function getTicket(id) {
        try {
            const Ticket = await ticketService.getTicketById(id)
            console.log(Ticket)
        } catch (error) {
            console.error("Failed to get ticket by ID:", (error as Error).message);
        }
    }
    // getTicket("3")


    async function update(id, status) {
        try {

            const updatedTicket = await ticketService.updateTicketStatus(id, status)
        } catch (error) {
            console.error("Failed to create ticket:", (error as Error).message);
        }
    }
    update("3", "closed")


    async function assign(id, assigneeId) {
        try {

            const assignedTicket = await ticketService.assignTicket(id, assigneeId)
        } catch (error) {
            console.error("Failed to create ticket:", (error as Error).message);
        }
    }
    assign("3", "1234")

}

main()