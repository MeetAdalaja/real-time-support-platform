# 30-Day Full-Stack Practical Roadmap

This README is your day-by-day execution guide for becoming stronger in full-stack JavaScript/TypeScript interviews through practical work.

The main project is:

**Real-Time Support And Incident Response Platform**

You are building a production-style internal company tool where support agents, engineers, and managers handle customer tickets, incidents, SLA deadlines, escalations, notifications, comments, attachments, audit logs, and real-time updates.

This project is designed to teach real engineering skills:

- Backend API design
- TypeScript
- NestJS
- PostgreSQL
- Redis
- WebSockets
- Background jobs
- Authentication
- Role-based access control
- Testing
- Docker
- CI/CD
- Debugging
- System design
- Interview explanation

DSA is intentionally removed from this README because you are already using an external system and solving one problem per day.

## How To Use This README

Every day, follow only that day’s section.

Each day has:

- **Goal:** what today is about.
- **Learn:** concepts you must understand.
- **Build:** project work you must complete.
- **Practice:** explanation/debugging/system thinking.
- **Done When:** clear finish line for the day.
- **Estimated Timeline:** realistic 8-10 hour structure.

Do not try to complete future days early unless today is fully done.

## Project Summary

You will build a real-time support and incident response platform with:

- Login and user roles
- Ticket creation and ticket lifecycle
- Ticket assignment
- Customer-visible replies
- Internal notes
- Ticket timeline/history
- Incident creation and incident updates
- SLA deadlines and escalation
- In-app notifications
- Redis-backed background jobs
- WebSocket real-time updates
- File attachment metadata
- Audit logs
- Dashboard summaries
- Tests
- Docker and CI
- Deployment notes

## Recommended Stack

- Frontend: Next.js, React, TypeScript
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: TypeORM
- Cache/queue: Redis
- Real-time: Socket.IO or NestJS WebSocket gateway
- Tests: Jest, Supertest, Playwright
- DevOps: Docker Compose, GitHub Actions

## Core Roles

| Role | Responsibilities |
| --- | --- |
| Admin | Manage users, roles, audit logs, and sensitive operations |
| Support Manager | Assign tickets, manage queues, handle escalations |
| Support Agent | Work on assigned tickets and reply to customers |
| Engineer | Handle technical escalations and incidents |
| Viewer | Read-only access |

## Main Data Models

You will gradually create these:

- `User`
- `Ticket`
- `TicketComment`
- `TicketEvent`
- `Incident`
- `IncidentUpdate`
- `Notification`
- `Attachment`
- `AuditLog`
- `RefreshToken` or `Session`

## 30-Day Plan

## Day 1: TypeScript, HTTP, And Project Understanding

### Goal

Understand what you are building and create the basic mental model for backend APIs.

Today is not about building a huge feature. Today is about understanding:

- What a support ticket system is
- How HTTP APIs work
- How TypeScript helps you model data safely
- What the first backend objects should look like

### Learn

Focus on these topics:

- TypeScript primitive types: `string`, `number`, `boolean`
- Object types and interfaces
- Union types
- Optional fields
- Function parameter and return types
- Basic HTTP methods: `GET`, `POST`, `PATCH`, `DELETE`
- Basic HTTP status codes: `200`, `201`, `400`, `401`, `403`, `404`, `500`
- Request body vs query params vs route params

You should be able to answer:

- What is the difference between `POST /tickets` and `GET /tickets`?
- Why should backend data be typed?
- What does a `400` error mean?
- What does a `401` error mean?
- What does a `403` error mean?

### Build

Create your first project notes and types.

Create or update a project notes file with:

```text
What is this app?
Who uses it?
What is a ticket?
What is an incident?
What actions can users perform?
What should happen when a ticket is created?
```

Then define your first TypeScript shapes:

```ts
type TicketPriority = "low" | "medium" | "high" | "urgent";

type TicketStatus =
  | "open"
  | "assigned"
  | "waiting_on_customer"
  | "escalated"
  | "resolved"
  | "closed";

type TicketCategory =
  | "billing"
  | "technical"
  | "account"
  | "bug"
  | "feature_request"
  | "incident";

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
```

Also define:

```ts
interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
}
```

### Practice

Explain this out loud:

> A customer submits a support ticket. What happens from the browser form to the backend API?

Use this flow:

1. User fills form.
2. Frontend validates obvious fields.
3. Frontend sends `POST /tickets`.
4. Backend validates request body.
5. Backend creates ticket.
6. Backend stores ticket in database.
7. Backend returns `201 Created`.
8. Frontend shows success state.

### Done When

You are done with Day 1 when:

- You understand what the project is.
- You can explain a ticket creation request.
- You created the basic ticket TypeScript types.
- You understand common HTTP methods and status codes.
- You wrote your Day 1 notes.

### Estimated Timeline

- 1h: Understand project domain
- 1.5h: Learn TypeScript basics
- 1h: Learn HTTP basics
- 2h: Write ticket types and notes
- 1h: Explain request lifecycle
- 1h: Review and clean notes

## Day 2: Async JavaScript And In-Memory Ticket Service

### Goal

Build your first backend-style service without a database.

Before using PostgreSQL, you need to understand service logic with simple in-memory data. This makes database work easier later.

### Learn

Focus on:

- `Promise`
- `async` and `await`
- `try/catch`
- Service functions
- CRUD operations
- Why business logic should not live directly inside controllers

You should be able to answer:

- Why do API functions often return promises?
- What happens when an async function throws?
- What is the difference between controller logic and service logic?

### Build

Create an in-memory ticket service.

It should support:

- Create ticket
- List tickets
- Get ticket by id
- Update ticket status
- Assign ticket

Example service methods:

```ts
createTicket(input)
listTickets(filters)
getTicketById(id)
updateTicketStatus(id, status)
assignTicket(id, assigneeId)
```

Keep data in an array for now.

Add simple rules:

- Title is required.
- Priority must be valid.
- Status must be valid.
- A closed ticket cannot be moved back to open.

### Practice

Explain:

- Why are rules placed in the service?
- What should happen if ticket id does not exist?
- What should happen if status transition is invalid?

### Done When

You are done when:

- You can create tickets in memory.
- You can list tickets.
- You can update ticket status.
- You can explain why service logic matters.

### Estimated Timeline

- 1h: Learn async/await
- 1h: Design service methods
- 3h: Build in-memory service
- 1h: Add simple validation/rules
- 1h: Practice explanation

## Day 3: Validation, Errors, And API Contracts

### Goal

Learn how real APIs protect themselves from bad input and return predictable errors.

### Learn

Focus on:

- DTOs
- Validation
- Error response shape
- Query params
- Pagination
- Filtering
- Sorting

You should be able to answer:

- Why does backend validation matter even if frontend validates?
- What is an API contract?
- Why should errors have a consistent shape?

### Build

Design your API contract.

Create standard error shape:

```json
{
  "statusCode": 400,
  "code": "VALIDATION_ERROR",
  "message": "Request validation failed",
  "details": [
    {
      "field": "title",
      "message": "Title is required"
    }
  ],
  "requestId": "req_123"
}
```

Design ticket list query:

```http
GET /tickets?page=1&limit=20&status=open&priority=urgent&sort=createdAt&order=desc
```

Add validation rules:

- Title: required, 3-120 characters
- Description: required, max 3000 characters
- Priority: low, medium, high, urgent
- Category: billing, technical, account, bug, feature_request, incident
- Requester email: valid email

### Practice

Explain:

- What is the difference between `400`, `401`, and `403`?
- Why is `limit` capped?
- Why should sort fields be allowlisted?

### Done When

You are done when:

- You have a clear API error shape.
- You have ticket validation rules.
- You have pagination/filtering/sorting rules.
- You can explain why API contracts matter.

### Estimated Timeline

- 1h: Learn validation and DTO concept
- 1h: Design error shape
- 2h: Define ticket validation rules
- 1.5h: Define pagination/filtering/sorting contract
- 1h: Practice explanation

## Day 4: NestJS Project Structure

### Goal

Understand how to organize a real NestJS backend.

### Learn

Focus on:

- Modules
- Controllers
- Services
- Providers
- Dependency injection
- DTO folder structure
- Common utilities

You should be able to answer:

- What is a NestJS module?
- What is a controller responsible for?
- What is a service responsible for?
- Why does dependency injection help?

### Build

Create backend module structure:

```text
src/
|-- auth/
|-- users/
|-- tickets/
|-- comments/
|-- incidents/
|-- notifications/
|-- audit/
|-- common/
```

Inside `tickets`, prepare:

```text
tickets.controller.ts
tickets.service.ts
ticket.entity.ts
dto/create-ticket.dto.ts
dto/update-ticket.dto.ts
```

Do not overbuild yet. The goal is clean structure.

### Practice

Explain:

- Controller receives HTTP request.
- DTO validates input.
- Service applies business rules.
- Repository/database stores data.

### Done When

You are done when:

- Backend folders are clear.
- Ticket module has controller/service/DTO structure.
- You can explain the responsibility of each layer.

### Estimated Timeline

- 1h: Learn NestJS structure
- 2h: Create module folders
- 2h: Create ticket controller/service skeleton
- 1h: Write architecture notes
- 1h: Explain structure out loud

## Day 5: PostgreSQL Data Modeling

### Goal

Design the database schema before writing database code.

### Learn

Focus on:

- Tables
- Columns
- Primary keys
- Foreign keys
- One-to-many relationships
- Many-to-many relationships
- Indexes
- Created/updated timestamps

You should be able to answer:

- Why do comments need a `ticketId`?
- Why do incident-ticket links need a separate table?
- What is an index?

### Build

Design these tables:

```text
users
tickets
ticket_comments
ticket_events
incidents
incident_updates
incident_tickets
notifications
attachments
audit_logs
```

For each table, write:

- Main columns
- Relationships
- Important indexes
- Why the table exists

Minimum ticket columns:

```text
id
title
description
priority
status
category
requester_email
assignee_id
created_by_id
created_at
updated_at
resolved_at
closed_at
```

### Practice

Explain:

- Difference between `ticket_comments` and `ticket_events`.
- Why `incident_tickets` is useful.
- Why status and priority should be indexed.

### Done When

You are done when:

- You have the database design written.
- You can explain every table.
- You know the first indexes you will add.

### Estimated Timeline

- 1h: Learn relational database basics
- 2h: Design schema
- 1.5h: Define relationships
- 1h: Define indexes
- 1h: Explain schema

## Day 6: Ticket CRUD With Database

### Goal

Connect your ticket service to PostgreSQL.

### Learn

Focus on:

- TypeORM entity
- Repository
- `find`
- `findOne`
- `save`
- `update`
- Filtering with `where`
- Pagination with `skip` and `take`

You should be able to answer:

- What is an entity?
- What is a repository?
- How does service logic use database access?

### Build

Implement:

- Create ticket
- List tickets
- Get ticket detail
- Update ticket status
- Assign ticket

Every list endpoint should support:

- Page
- Limit
- Status filter
- Priority filter
- Category filter
- Assignee filter

When ticket status changes, create a ticket event.

### Practice

Explain:

- What happens when ticket status changes?
- Why do we create event history?
- What could go wrong if database write fails?

### Done When

You are done when:

- Ticket CRUD works with database.
- Ticket status changes create history.
- Ticket list supports basic filters.

### Estimated Timeline

- 1h: Learn TypeORM basics
- 3h: Implement ticket database CRUD
- 1h: Add filters/pagination
- 1h: Add ticket event on status change
- 1h: Manual testing and explanation

## Day 7: Swagger, Seed Data, And Week 1 Review

### Goal

Make the backend understandable and demo-friendly.

### Learn

Focus on:

- Swagger/OpenAPI
- API documentation
- Seed data
- Manual testing
- Weekly review

### Build

Add:

- Swagger setup
- Swagger docs for ticket endpoints
- Seed data for users and tickets
- README notes for how to run backend

Seed at least:

- 5 users
- 20 tickets
- Multiple statuses
- Multiple priorities
- Multiple categories
- Multiple assignees

### Practice

Give a 5-minute explanation:

> This week I built the backend foundation for a support ticket platform.

Include:

- What the app does
- What tables exist
- What endpoints exist
- What is incomplete
- What comes next

### Done When

You are done when:

- Swagger docs open.
- Seed tickets exist.
- You can explain week 1 clearly.

### Estimated Timeline

- 1h: Learn Swagger basics
- 2h: Add Swagger docs
- 2h: Add seed data
- 1h: Manual test endpoints
- 1h: Week 1 review

## Day 8: Authentication

### Goal

Allow users to securely log in.

### Learn

Focus on:

- Password hashing
- bcrypt
- JWT or sessions
- Access token
- Refresh token
- Auth guard
- Login failure handling

You should be able to answer:

- Why do we hash passwords?
- What is the difference between authentication and authorization?
- What should happen when login fails?

### Build

Implement:

- Register user
- Login user
- Hash password
- Validate password
- Issue token/session
- Get current user endpoint
- Protect ticket routes

### Practice

Explain:

- Login flow step by step.
- Why passwords are never stored as plain text.
- What happens when token is missing.

### Done When

You are done when:

- User can register.
- User can login.
- Protected routes reject unauthenticated requests.
- `/me` returns current user.

### Estimated Timeline

- 1h: Learn auth basics
- 2h: Build register/login
- 1.5h: Add password hashing
- 1.5h: Add auth guard/current user
- 1h: Manual testing

## Day 9: Role-Based Access Control

### Goal

Control what each user role can do.

### Learn

Focus on:

- Authorization
- Roles
- Permissions
- Guards
- Permission helpers
- Backend enforcement vs frontend hiding

### Build

Implement roles:

- Admin
- Support Manager
- Support Agent
- Engineer
- Viewer

Implement permissions:

- Create ticket
- Assign ticket
- Reply to ticket
- Add internal note
- Escalate ticket
- Create incident
- Resolve incident
- View audit logs
- Delete ticket

Protect routes based on permissions.

### Practice

Explain:

- Why frontend role hiding is not security.
- Why backend must enforce permissions.
- Difference between authentication and authorization.

### Done When

You are done when:

- Viewer cannot mutate tickets.
- Support manager can assign tickets.
- Engineer can create incidents.
- Admin can view audit logs.

### Estimated Timeline

- 1h: Learn RBAC basics
- 2h: Define permissions
- 2h: Build permission guard/helper
- 1h: Protect routes
- 1h: Manual role testing

## Day 10: Comments And Ticket Timeline

### Goal

Make ticket detail realistic with comments and history.

### Learn

Focus on:

- One-to-many relationships
- Internal notes vs public replies
- Timeline/event modeling
- Append-only history

### Build

Implement:

- Add ticket comment
- List ticket comments
- Mark comment as internal or customer-visible
- Add ticket event records
- Show ticket event history

Events should include:

- Ticket created
- Ticket assigned
- Status changed
- Comment added
- Ticket escalated

### Practice

Explain:

- Why comments and events are separate.
- Why history should not be overwritten.
- How timeline helps debugging.

### Done When

You are done when:

- Ticket detail has comments.
- Ticket detail has event history.
- Internal notes are separate from customer-visible replies.

### Estimated Timeline

- 1h: Learn relationship modeling
- 2h: Build comments
- 2h: Build ticket events
- 1h: Manual test ticket timeline
- 1h: Explanation notes

## Day 11: Incident Management

### Goal

Add production incident workflows.

### Learn

Focus on:

- Incident lifecycle
- Severity levels
- Linking related records
- Incident updates
- Resolution timestamps

### Build

Implement incidents:

- Create incident
- List incidents
- View incident detail
- Add incident update
- Link ticket to incident
- Resolve incident

Incident severities:

- `sev1`
- `sev2`
- `sev3`
- `sev4`

Incident statuses:

- `investigating`
- `identified`
- `monitoring`
- `resolved`

### Practice

Explain:

- Difference between ticket and incident.
- When a ticket becomes an incident.
- Why incidents need updates.

### Done When

You are done when:

- Engineer can create incident from ticket.
- Incident can have updates.
- Incident can be resolved.
- Ticket can be linked to incident.

### Estimated Timeline

- 1h: Learn incident concepts
- 2h: Build incident model/endpoints
- 1.5h: Link tickets to incidents
- 1h: Add incident updates
- 1h: Manual testing

## Day 12: Frontend App Shell

### Goal

Create the user interface foundation.

### Learn

Focus on:

- Next.js App Router
- Layouts
- Pages
- Server vs client components
- Protected routes
- Basic responsive layout

### Build

Create:

- Login page
- Dashboard layout
- Sidebar
- Top navigation
- Tickets page
- Incidents page
- Notifications page
- Audit logs page placeholder

### Practice

Explain:

- Difference between page and layout.
- What makes a route protected.
- Why app shell should be built before detailed screens.

### Done When

You are done when:

- App has a navigable layout.
- Login page exists.
- Main sections exist.
- Unauthenticated users cannot access protected pages.

### Estimated Timeline

- 1h: Learn Next.js routing/layouts
- 2h: Build layout/sidebar/topbar
- 1.5h: Build placeholder pages
- 1h: Add protected route behavior
- 1h: Review UI structure

## Day 13: Ticket List And Ticket Form UI

### Goal

Build the main ticket user interface.

### Learn

Focus on:

- Controlled forms
- Tables
- Filters
- Loading state
- Empty state
- Error state
- Form validation

### Build

Create:

- Ticket list table
- Ticket creation form
- Status filter
- Priority filter
- Category filter
- Assignee filter
- Loading state
- Empty state
- Error state

### Practice

Explain:

- Why every async UI needs loading/error/empty states.
- Why frontend validation improves UX but does not replace backend validation.

### Done When

You are done when:

- User can view ticket list UI.
- User can submit ticket form.
- UI handles loading, empty, and error states.

### Estimated Timeline

- 1h: Learn form/table patterns
- 2h: Build ticket table
- 2h: Build ticket form
- 1h: Add filters/states
- 1h: Manual UI review

## Day 14: Connect Frontend To Backend

### Goal

Make the frontend and backend work together.

### Learn

Focus on:

- API clients
- Fetching data
- Handling auth tokens/sessions
- Handling API errors
- Form submission flow

### Build

Connect:

- Login form to login API
- Ticket list to ticket API
- Ticket creation form to create API
- Ticket detail page to detail API
- Comment form to comment API

Handle:

- `401`
- `403`
- Validation errors
- Server errors

### Practice

Explain:

- What happens when frontend receives `403`.
- What happens when API returns validation error.
- How frontend decides what to render.

### Done When

You are done when:

- User can login from UI.
- User can create ticket from UI.
- User can view ticket detail from UI.
- Errors render clearly.

### Estimated Timeline

- 1h: Learn API client pattern
- 2h: Connect auth
- 2h: Connect tickets
- 1h: Connect comments
- 1h: Manual end-to-end testing

## Day 15: Accessibility And UX Quality

### Goal

Make the UI usable and professional.

### Learn

Focus on:

- Labels
- Focus states
- Keyboard navigation
- Error placement
- Color contrast
- Confirmation dialogs

### Build

Improve:

- Login form accessibility
- Ticket form accessibility
- Filter controls
- Confirmation for sensitive actions
- Clear status/priority labels
- Role-aware disabled states

### Practice

Use only keyboard to:

- Login
- Navigate ticket list
- Create ticket
- Open ticket detail
- Add comment

### Done When

You are done when:

- Core flows are keyboard usable.
- Inputs have labels.
- Errors are clear.
- UI does not depend only on color.

### Estimated Timeline

- 1h: Learn accessibility basics
- 2h: Improve forms
- 1.5h: Improve table/filter UX
- 1h: Keyboard testing
- 1h: Fix issues

## Day 16: WebSockets And Real-Time Updates

### Goal

Add real-time behavior.

### Learn

Focus on:

- WebSockets
- HTTP polling vs WebSockets
- Event names
- Subscriptions
- Reconnect behavior
- Real-time UI safety

### Build

Implement:

- WebSocket gateway
- Ticket update event
- Comment added event
- Incident update event
- Frontend listener
- Live update on ticket detail

Example events:

```text
ticket.updated
ticket.comment_added
incident.updated
notification.created
```

### Practice

Explain:

- When WebSockets are useful.
- When normal HTTP is enough.
- What happens if connection drops.

### Done When

You are done when:

- New comment appears without page refresh.
- Ticket status update can be pushed live.
- You understand WebSocket tradeoffs.

### Estimated Timeline

- 1h: Learn WebSocket basics
- 2h: Build backend gateway
- 2h: Connect frontend listener
- 1h: Manual real-time testing
- 1h: Write tradeoff notes

## Day 17: SLA Deadlines And Background Jobs

### Goal

Add production-style background processing.

### Learn

Focus on:

- Background jobs
- Scheduled jobs
- Redis queues
- SLA rules
- Escalation
- Idempotency

### Build

Implement SLA rules:

- Urgent ticket: 1 hour
- High ticket: 4 hours
- Medium ticket: 1 business day
- Low ticket: 3 business days

Build:

- SLA deadline calculation
- Background job to check overdue tickets
- Auto-escalate breached tickets
- Escalation event
- Escalation notification

### Practice

Explain:

- Why SLA checks should not depend on user opening the page.
- Why background jobs need idempotency.
- What happens if job runs twice.

### Done When

You are done when:

- Tickets have SLA deadlines.
- Overdue tickets can be detected.
- Breached tickets can be escalated.
- Duplicate escalation is prevented or documented.

### Estimated Timeline

- 1h: Learn queues/background jobs
- 1h: Define SLA rules
- 2h: Build SLA calculation
- 2h: Build background check/escalation
- 1h: Test and explain

## Day 18: Notifications And Retry Logic

### Goal

Build notification workflow and reliability thinking.

### Learn

Focus on:

- Notification types
- Retry behavior
- Deduplication
- Mark as read
- Failure simulation

### Build

Implement notifications for:

- Ticket assigned
- Ticket escalated
- SLA breached
- Incident created
- Incident updated

Add:

- List notifications
- Mark notification as read
- Retry failed notification
- Prevent duplicate notification for same event

### Practice

Explain:

- Why retries can create duplicates.
- How deduplication keys help.
- What happens if notification worker fails.

### Done When

You are done when:

- Notifications are created for key events.
- User can mark notification read.
- Retry behavior is tested or simulated.

### Estimated Timeline

- 1h: Learn notification workflow
- 2h: Build notification model/endpoints
- 2h: Connect notifications to events
- 1h: Add retry/deduplication
- 1h: Manual testing

## Day 19: Database Performance

### Goal

Learn how to find and improve slow queries.

### Learn

Focus on:

- Indexes
- `EXPLAIN`
- Query filters
- Sorting performance
- Large seed data
- Before/after measurement

### Build

Seed:

- At least 5,000 tickets
- Many statuses
- Many priorities
- Many assignees
- Many comments

Measure ticket list query:

```http
GET /tickets?status=open&priority=urgent&assigneeId=...&sort=createdAt&order=desc
```

Add useful indexes.

Document:

- Before timing
- After timing
- Index added
- Why it helped

### Practice

Explain:

- What is an index?
- Why can index improve reads?
- Why can too many indexes hurt writes?

### Done When

You are done when:

- You measured a slow query.
- You added at least one useful index.
- You documented before/after.

### Estimated Timeline

- 1h: Learn index basics
- 1.5h: Seed large data
- 1.5h: Measure slow query
- 1.5h: Add index and retest
- 1h: Write performance note

## Day 20: Unit And Integration Tests

### Goal

Prove important backend behavior with tests.

### Learn

Focus on:

- Unit tests
- Integration tests
- What to mock
- What not to mock
- Test data setup
- Failure path testing

### Build

Unit test:

- Permission helper
- SLA deadline calculation
- Status transition rules
- Notification deduplication

Integration test:

- Login
- Create ticket
- Assign ticket
- Add comment
- Create incident
- Forbidden role cannot mutate

### Practice

Explain:

- Difference between unit and integration tests.
- Why permission tests matter.
- Why failure-path tests matter.

### Done When

You are done when:

- Key business rules have unit tests.
- Main API flows have integration tests.
- At least one forbidden action is tested.

### Estimated Timeline

- 1h: Learn test types
- 2h: Write unit tests
- 2.5h: Write integration tests
- 1h: Fix bugs found by tests
- 1h: Write test summary

## Day 21: End-To-End Tests

### Goal

Test the app like a user.

### Learn

Focus on:

- Playwright
- User flows
- Stable selectors
- Avoiding flaky tests
- Testing important paths only

### Build

E2E test:

- Login
- Create ticket
- Open ticket detail
- Add comment
- Assign ticket
- Create incident from ticket
- Viewer cannot mutate ticket

### Practice

Explain:

- Why E2E tests are valuable.
- Why too many E2E tests become expensive.
- Difference between testing UI and testing business logic.

### Done When

You are done when:

- At least 3 E2E flows run.
- Tests cover one happy path and one forbidden path.
- You can explain your test strategy.

### Estimated Timeline

- 1h: Learn Playwright basics
- 3h: Write E2E tests
- 1h: Fix selectors/flakiness
- 1h: Run and debug tests
- 1h: Write test strategy notes

## Day 22: Docker And Local Infrastructure

### Goal

Make the app easier to run like a real project.

### Learn

Focus on:

- Docker images
- Containers
- Ports
- Volumes
- Docker Compose
- Environment variables

### Build

Add or verify:

- PostgreSQL service
- Redis service
- API Dockerfile
- Web Dockerfile
- Worker service if separate
- `.env.example`
- Local startup instructions

### Practice

Explain:

- What Docker Compose does.
- Why environment variables matter.
- What happens if Redis container is down.

### Done When

You are done when:

- Postgres and Redis run through Docker Compose.
- `.env.example` is complete.
- Local startup steps are documented.

### Estimated Timeline

- 1h: Learn Docker basics
- 2h: Configure Docker Compose
- 2h: Add/fix Dockerfiles
- 1h: Test local startup
- 1h: Write setup notes

## Day 23: CI Pipeline

### Goal

Add team-level quality checks.

### Learn

Focus on:

- GitHub Actions
- Typecheck
- Lint
- Test
- Build
- CI failure debugging

### Build

Create CI pipeline that runs:

- Install dependencies
- Typecheck API
- Typecheck web
- Lint
- Unit tests
- Integration tests
- Build API
- Build web

### Practice

Explain:

- Why CI matters.
- What kind of bugs CI catches.
- What CI cannot catch.

### Done When

You are done when:

- CI file exists.
- CI commands match local commands.
- You understand every pipeline step.

### Estimated Timeline

- 1h: Learn GitHub Actions
- 2h: Write CI workflow
- 1h: Align local scripts
- 1h: Simulate/fix failure
- 1h: Write CI notes

## Day 24: Deployment Planning

### Goal

Prepare the project for real-world deployment.

### Learn

Focus on:

- Build-time config
- Runtime config
- Environment variables
- Database URL
- Redis URL
- WebSocket URL
- Deployment failure debugging
- Rollback thinking

### Build

Prepare:

- Deployment checklist
- Production env variable list
- Demo account seed
- Deployment notes for frontend
- Deployment notes for backend
- Rollback plan

If possible, deploy:

- Frontend to Vercel
- Backend to Render/Fly/Railway
- Database/Redis using managed service

### Practice

Explain:

- What can go wrong during deployment.
- Difference between local and production config.
- How you would debug a failed deployment.

### Done When

You are done when:

- You have either a live demo or exact deployment instructions.
- Production environment variables are documented.
- Rollback plan exists.

### Estimated Timeline

- 1h: Learn deployment concepts
- 2h: Prepare deployment checklist
- 2h: Attempt deployment or write precise guide
- 1h: Add demo seed notes
- 1h: Write rollback plan

## Day 25: System Design - Support Ticket System

### Goal

Learn to design the same system at interview level.

### Learn

Focus on:

- Functional requirements
- Non-functional requirements
- APIs
- Data model
- Read flow
- Write flow
- Search
- Pagination
- Scaling bottlenecks

### Build

Write a system design document for:

**Support Ticket System**

Include:

- Requirements
- Out of scope
- APIs
- Tables
- Ticket creation flow
- Ticket assignment flow
- Search/filter flow
- Scaling bottleneck
- Failure modes
- Tradeoffs

### Practice

Explain this design in 10 minutes.

### Done When

You are done when:

- You have a written design document.
- You can explain the design without reading word-for-word.
- You can explain one tradeoff.

### Estimated Timeline

- 1h: Learn system design structure
- 2h: Write requirements/API/data model
- 2h: Write flows and bottlenecks
- 1h: Practice explanation

## Day 26: System Design - Notifications And File Uploads

### Goal

Learn async workflow and file handling system design.

### Learn

Focus on:

- Queues
- Retries
- Deduplication
- Dead-letter queues
- File metadata
- Object storage
- File validation
- Background processing

### Build

Write two short system design notes:

1. Notification service
2. File upload service

For notification service:

- Trigger events
- Queue
- Retry
- Deduplication
- User preferences
- Failure handling

For file upload:

- Upload flow
- Metadata table
- File size/type validation
- Storage location
- Virus scan placeholder
- Preview generation placeholder

### Practice

Explain:

- Why queues help.
- Why retries can be dangerous.
- Why object storage is better than storing files in database.

### Done When

You are done when:

- Notification design note exists.
- File upload design note exists.
- You can explain retries and deduplication.

### Estimated Timeline

- 1h: Learn queues/retries
- 1h: Learn file upload architecture
- 2h: Write notification design
- 2h: Write file upload design
- 1h: Practice explanation

## Day 27: Production Review

### Goal

Review the whole system like an engineer preparing for interviews.

### Learn

Focus on reviewing:

- Auth
- RBAC
- Ticket lifecycle
- Incident lifecycle
- SLA jobs
- Notifications
- WebSockets
- Database indexes
- Tests
- Docker
- CI
- Deployment

### Build

Create:

- 10-minute project walkthrough script
- Top 5 tradeoffs list
- Top 5 bugs/failures list
- Top 5 future improvements list

### Practice

Explain:

- What you built
- Why you chose the architecture
- What was hardest
- What you would improve

### Done When

You are done when:

- Project walkthrough script exists.
- You can present the project in 10 minutes.
- You know your strongest and weakest areas.

### Estimated Timeline

- 2h: Review architecture
- 2h: Review code/features
- 1h: Write walkthrough
- 1h: Write tradeoffs/failures/improvements
- 1h: Practice out loud

## Day 28: Mock Interview Day

### Goal

Practice interview performance, not just knowledge.

### Learn

Focus on:

- Speaking clearly
- Explaining decisions
- Handling follow-up questions
- Admitting uncertainty professionally
- Connecting project work to resume claims

### Build

No major new features today.

Instead, prepare:

- Project demo flow
- 3 technical stories
- 3 debugging stories
- 3 behavioral stories

### Practice

Do mock rounds:

- Project deep dive
- Backend/API questions
- Database questions
- Testing questions
- Behavioral questions

Record weak answers and rewrite them.

### Done When

You are done when:

- You completed at least one full mock project explanation.
- You rewrote weak answers.
- You know what to fix tomorrow.

### Estimated Timeline

- 1h: Prepare demo
- 2h: Mock interview practice
- 2h: Rewrite weak answers
- 1h: Review project proof

## Day 29: Resume Defense And Proof Log

### Goal

Make your resume claims defensible.

### Learn

Focus on:

- STAR format
- Technical storytelling
- Metrics
- Evidence
- Honest explanation

### Build

Create a proof log:

| Claim | Project Proof | Test/Screenshot/File | Explanation |
| --- | --- | --- | --- |
| Secured APIs with auth/RBAC | | | |
| Built real-time updates | | | |
| Added background jobs | | | |
| Improved database performance | | | |
| Added tests | | | |
| Used Docker/CI | | | |
| Debugged production-style issue | | | |

Prepare stories for:

- Hardest bug
- Performance improvement
- Auth/RBAC
- Background job/SLA
- WebSocket real-time update
- Testing strategy
- Deployment/CI issue
- Tradeoff decision

### Practice

Answer:

- Tell me about your project.
- What was the hardest part?
- How did you test it?
- What would break at scale?
- What would you improve?

### Done When

You are done when:

- Every major claim has proof.
- You have 8 interview stories.
- You can answer project questions without sounding vague.

### Estimated Timeline

- 2h: Build proof log
- 2h: Write STAR stories
- 1h: Practice resume defense
- 1h: Fix missing proof

## Day 30: Final Simulation And Next Plan

### Goal

Run a full final review and prepare next steps.

### Learn

Focus on:

- Final clarity
- Weak area identification
- Interview confidence
- Next 30-day improvement cycle

### Build

Finalize:

- README/project documentation
- Architecture diagram or explanation
- API docs screenshots
- Test summary
- Deployment notes
- Demo credentials
- Proof log

### Practice

Run a full simulation:

- 30m: Project explanation
- 30m: Backend deep dive
- 30m: Database/performance deep dive
- 30m: Testing/devops deep dive
- 30m: Behavioral stories
- 30m: System design explanation

### Done When

You are done when:

- You can present the project confidently.
- You know your remaining weak points.
- You have a next-step plan.
- Your portfolio project has proof, not just code.

### Estimated Timeline

- 2h: Final documentation
- 2h: Final mock interview
- 1h: Fix weak answers
- 1h: Write next 30-day plan

## Practical Resource Map

Use these only when needed. Do not read documentation endlessly.

### TypeScript

- TypeScript Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Focus only on: object types, unions, functions, generics, narrowing.

### HTTP And API Basics

- MDN HTTP Overview: https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview
- MDN Status Codes: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

### NestJS

- First Steps: https://docs.nestjs.com/first-steps
- Controllers: https://docs.nestjs.com/controllers
- Providers: https://docs.nestjs.com/providers
- Authentication: https://docs.nestjs.com/security/authentication
- WebSockets: https://docs.nestjs.com/websockets/gateways
- OpenAPI: https://docs.nestjs.com/openapi/introduction

### Next.js And React

- Next.js Learn Dashboard: https://nextjs.org/learn/dashboard-app
- React Learn: https://react.dev/learn

### PostgreSQL

- PostgreSQL Tutorial: https://www.postgresqltutorial.com/
- PostgreSQL EXPLAIN: https://www.postgresql.org/docs/current/using-explain.html
- Use The Index, Luke: https://use-the-index-luke.com/

### Redis, Queues, Real-Time

- Redis Docs: https://redis.io/docs/latest/
- BullMQ Guide: https://docs.bullmq.io/
- Socket.IO Docs: https://socket.io/docs/v4/

### Testing

- Jest: https://jestjs.io/docs/getting-started
- Supertest: https://github.com/ladjs/supertest
- Playwright: https://playwright.dev/docs/intro

### Docker And CI

- Docker Get Started: https://docs.docker.com/get-started/
- GitHub Actions Node Guide: https://docs.github.com/actions/automating-builds-and-tests/building-and-testing-nodejs

## Final Project Walkthrough Script

Use this in interviews:

```text
I built a real-time support and incident response platform for internal company teams.

The frontend is Next.js and React. The backend is NestJS with PostgreSQL. Redis is used for background jobs, notification retries, and cache support. The system supports authentication, role-based permissions, ticket management, comments, incident response, SLA escalation, real-time updates, audit logs, tests, Docker, and CI.

The hardest part was making workflow changes reliable. A ticket status change is not just a database update. It can create a timeline event, trigger a WebSocket update, notify the assignee, affect SLA state, and write an audit log. I separated the core business rule from the side effects so the behavior stayed understandable and testable.

I tested the dangerous paths: viewers cannot mutate tickets, support managers can assign tickets, engineers can create incidents, SLA escalation works, invalid payloads return consistent errors, and login/ticket creation work end to end.

One production-style improvement I made was performance testing ticket list queries with seeded data and indexes. I documented before/after behavior and added reliability notes for Redis, WebSockets, and background jobs.

If I had more time, I would add email provider integration, object storage for attachments, dead-letter queue dashboards, and richer incident postmortem reports.
```

## Final Advice

For each day, do not ask, "Did I read enough?"

Ask:

- Did I build the required piece?
- Can I explain it?
- Can I debug it?
- Can I show proof?

That is how this roadmap turns into real interview readiness.

