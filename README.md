# Invoice Management System - Backend (NestJS)

This is the backend part of the Invoice Management System built with **NestJS**. The backend handles all the business logic, database operations, and serves the API endpoints for the frontend.

## Requirements

- Node.js (v22.12.0)
- NestJS (11.0.2)
- TypeORM (or any other ORM for database connection)
- MySQl

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Aakash-Bhoi730/invoice-backend.git
   cd invoice
   npm install
   npm run start
   ```

   //API ENDPOINTS

1.CREATE A INVOICE
--> localhost:3000/invoice/add [POST REQUEST]
2.GET ALL INVOICE
--> localhost:3000/invoice/ [GET REQUEST]
3.SEARCH BY KEYWORD
--> http://localhost:3000/invoice/search?search=ABC [GET REQUEST]
--> http://localhost:3000/invoice/search?search=INV-1500 [GET REQUEST]
