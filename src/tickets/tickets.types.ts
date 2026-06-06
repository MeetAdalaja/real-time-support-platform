export enum TicketPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum TicketStatus {
  OPEN = 'open',
  ASSIGNED = 'assigned',
  WAITING_ON_CUSTOMER = 'waiting_on_customer',
  ESCALATED = 'escalated',
  RESOLVED = 'resolved',
  CLOSED = 'closed',
}

export enum TicketCategory {
  BILLING = 'billing',
  TECHNICAL = 'technical',
  ACCOUNT = 'account',
  BUG = 'bug',
  FEATURE_REQUEST = 'feature_request',
  INCIDENT = 'incident',
}


interface Ticket {
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

interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}