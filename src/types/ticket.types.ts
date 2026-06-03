export type TicketPriority = 'low' | 'medium' | 'high' | 'critical';

export type TicketStatus = | "open" | "assigned" | "waiting_on_customer" | "escalated" | "resolved" | "closed";

export type TicketCategory = "billing" | "technical" | "account" | "bug" | "feature_request" | "incident";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    priority: TicketPriority;
    status: TicketStatus;
    category: TicketCategory;
    requesterEmail: string;
    assigneeId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
    total: number;
}