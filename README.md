# Coconut Juice Inventory (CocoTracker) - Backend

## Project Overview

The Coconut Juice Inventory Management System is a web application designed to help small businesses manage their coconut juice inventory. It simplifies the process of tracking inventory, ensuring there is enough stock to meet demand, and avoiding stockouts. The system tracks the amount of coconut juice available, where it's stored, and daily sales.

This project focuses on the backend development using Node.js, Express.js, and MongoDB. The backend API handles CRUD operations for various collections in the MongoDB database.

## Collections

### Users Collection

| Field       | Type   | Description                           |
|-------------|--------|---------------------------------------|
| name        | String | Name of the user (required)           |
| email       | String | Email address of the user (required, unique) |
| phoneNumber | String | Phone number of the user              |
| password    | String | Password for user authentication (required) |
| role        | String | Role of the user (admin/kiosk owner) (required, default: "kiosk owner") |

### Kiosk Stores Collection

| Field              | Type   | Description                          |
|--------------------|--------|--------------------------------------|
| storeName          | String | Name of the store (required, unique) |
| address            | String | Address of the store (required)      |
| contactInformation | String | Contact information for the store (required) |

### Stock Collection

| Field        | Type   | Description                          |
|--------------|--------|--------------------------------------|
| supplierName | String | Name of the supplier (required)      |
| date         | Date   | Date of the transaction (required)   |
| quantityStock| Number | Quantity of stock (required)         |

### Sales Collection

| Field             | Type   | Description                       |
|-------------------|--------|-----------------------------------|
| quantitySold      | Number | Quantity of juice sold (required) |
| date              | Date   | Date of the sale (required)       |
| storeName         | String | Name of the store                 |
| kioskOwner        | String | Name of the kiosk owner           |
| stockAllocationId | ObjectId | Reference to the stock allocation (required) |

### Stock Allocation Collection

| Field             | Type     | Description                              |
|-------------------|----------|------------------------------------------|
| kioskOwnerId      | ObjectId | Reference to the user (required)         |
| allocatedStock    | Number   | Quantity of allocated stock (required)   |
| dateAllocated     | Date     | Date of allocation (default: Date.now)   |
| returnRequestId   | ObjectId | Reference to the return request          |

### Return Stock Collection

| Field             | Type     | Description                              |
|-------------------|----------|------------------------------------------|
| stockAllocationId | ObjectId | Reference to the stock allocation (required) |
| returningStock    | Number   | Quantity of juice returned (required)    |
| reason            | String   | Reason for returning the juice           |
| status            | String   | Status of the request (enum: ["pending", "approved", "rejected"], default: "pending") |
| dateRequested     | Date     | Date of the return request (default: Date.now) |
| dateApproved      | Date     | Date of return request approval          |

## Usage

To run this project, make sure you have Node.js and MongoDB installed. Follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/yashmodi9998/Cocotracker-backend.git
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables in a `.env` file:

   ```sh
   DB_URL=your_mongodb_url
   PORT=your_port_number
   JWT_SECRET=your_secret_key
   EMAIL=your_email
   PASS=your_16_character_app_password
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

5. The server will be running at `http://localhost:<PORT>`, and you can use tools like Postman to interact with the API endpoints.

## Deployment

This project is deployed on Vercel and can be accessed at: [https://cocotracker-backend.vercel.app](https://cocotracker-backend.vercel.app)

## API Endpoints

### Authentication
All routes except `POST /login` and `POST /register` require authentication. Use the JWT token in the `Authorization` header of your requests.

### User Routes

| **Endpoint** | **Method** | **Description**                    |
|--------------|------------|------------------------------------|
| `/`          | `GET`      | Get details of the logged-in user. |
| `/register`  | `POST`     | Register a new user.               |
| `/login`     | `POST`     | Log in and get a JWT token.        |
| `/:id`       | `PUT`      | Update user details.               |
| `/:id`       | `DELETE`   | Delete a user by ID.               |

### Store Routes

| **Endpoint**  | **Method** | **Description**           |
|---------------|------------|---------------------------|
| `/stores`     | `GET`      | Get a list of all stores. |
| `/stores`     | `POST`     | Add a new store.          |
| `/stores/:id` | `DELETE`   | Delete a store by ID.     |
| `/stores/:id` | `PUT`      | Update store details.     |

### Stock Routes

| **Endpoint**  | **Method** | **Description**           |
|---------------|------------|---------------------------|
| `/stock`      | `GET`      | Get a list of all stocks. |
| `/stock`      | `POST`     | Add new stock.            |
| `/stock/:id`  | `DELETE`   | Delete a stock by ID.     |
| `/stock/:id`  | `PUT`      | Update stock details.     |

### Sales Routes

| **Endpoint**  | **Method** | **Description**           |
|---------------|------------|---------------------------|
| `/sales`      | `GET`      | Get a list of all sales.  |
| `/sales`      | `POST`     | Add a new sale.           |
| `/sales/:id`  | `DELETE`   | Delete a sale by ID.      |
| `/sales/:id`  | `PUT`      | Update sale details.      |

### Stock Allocation Routes

| **Endpoint**                    | **Method** | **Description**                                          |
|---------------------------------|------------|----------------------------------------------------------|
| `/allocate-stock`               | `GET`      | Get a list of all stock allocations (Admin only).        |
| `/allocate-stock/:kioskOwnerId` | `GET`      | Get stock allocations for a specific kiosk owner.        |
| `/allocate-stock`               | `POST`     | Allocate stock to a kiosk owner.                         |
| `/allocate-stock/:id`           | `DELETE`   | Delete a stock allocation by ID.                         |
| `/allocate-stock/:id`           | `PUT`      | Update a stock allocation by ID.                         |

### Return Request Routes

| **Endpoint**                    | **Method** | **Description**                              |
|---------------------------------|------------|----------------------------------------------|
| `/return-request`               | `POST`     | Request a return for allocated stock.        |
| `/return-requests`              | `GET`      | Get a list of all return requests.           |
| `/return-requests/:kioskOwnerId`| `GET`      | Get return requests for a specific kiosk owner. |
| `/approve-return-request/:id`   | `PUT`      | Approve a return request.                    |
| `/return-request/:id`           | `DELETE`   | Reject a return request.                     |

## Features

### Email Notifications

Using Nodemailer, the system sends automated email notifications for the following events:
- When new stock is allocated to a user.
- When a user requests a return.
- When a return request is approved or rejected.

Configure your email settings in the `.env` file for these features to work.

