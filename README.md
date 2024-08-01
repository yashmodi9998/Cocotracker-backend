# Coconut Juice Inventory (CocoTracker) - Backend

## Project Overview

The Coconut Juice Inventory Management System is a web application designed to help small businesses manage their coconut juice inventory. It simplifies the process of tracking inventory, ensuring there is enough stock to meet demand, and avoiding stockouts. The system tracks the amount of coconut juice available, where it's stored, and daily sales.

This project focuses on the backend development using Node.js, Express.js, and MongoDB. The backend API handles CRUD operations for various collections in the MongoDB database.

## Collections

### Users Collection(DONE)

| Field       | Description                          |
| ----------- | ------------------------------------ |
| userID      | Unique identifier for the user       |
| name        | Name of the user                     |
| email       | Email address of the user            |
| phoneNumber | Phone num of the user                |
| password    | Password for user authentication     |
| role        | Role of the user (admin/kiosk owner) |

### Kiosk Stores Collection(DONE)

| Field              | Description                       |
| ------------------ | --------------------------------- |
| storeID            | Unique identifier for the store   |
| storeName          | Name of the store                 |
| address            | Address of the store              |
| contactInformation | Contact information for the store |

### Stock Collection(DONE)

| Field        | Description                           |
| ------------ | ------------------------------------- |
| ID           | Unique identifier for the stock entry |
| date         | Date of the stock entry               |
| quantity     | Quantity of juice in stock            |
| supplierName | Name of the supplier                  |

### Sales Collection(DONE)

| Field        | Description                    |
| ------------ | ------------------------------ |
| storeID      | Identifier for the store       |
| quantitySold | Quantity of juice sold         |
| kioskOwnerID | Identifier for the kiosk owner |
| date         | date of sales                  |
| storeName    | Name of the store              |
| kioskOwner   | Name of the kiosk owner        |

### Return Stock Collection(DONE)

| Field          | Description                     |
| -------------- | ------------------------------- |
| storeID        | Identifier for the store        |
| kioskOwnerId   | Identifier for the kiosk owner  |
| remainingStock | Quantity of juice returned      |
| reason         | Reason for returning the juice  |
| status         | status of the request           |
| dateRequested  | Date of the returnRequest       |
| dateApproved   | Date of return request approved |



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
   ```

4. Start the server:

   ```sh
   npm run dev
   ```

5. The server will be running at `http://localhost:<PORT>`, and you can use tools like Postman to interact with the API endpoints.

## API Endpoints


---

# API Documentation

## Authentication
All routes except `POST /login` `POST /register` require authentication. Use the JWT token in the `Authorization` header of your requests.

## Endpoints

### User Routes

| **Endpoint**        | **Method** | **Description**                  |
|---------------------|------------|----------------------------------|
| `/`                 | `GET`      | Get details of the logged-in user. |
| `/register`         | `POST`     | Register a new user.              |
| `/login`            | `POST`     | Log in and get a JWT token.       |
| `/:id`              | `PUT`      | Update user details.             |
| `/:id`              | `DELETE`   | Delete a user by ID.             |

### Store Routes

| **Endpoint**        | **Method** | **Description**                  |
|---------------------|------------|----------------------------------|
| `/stores`           | `GET`      | Get a list of all stores.        |
| `/stores`           | `POST`     | Add a new store.                 |
| `/stores/:id`       | `DELETE`   | Delete a store by ID.            |
| `/stores/:id`       | `PUT`      | Update store details.            |

### Stock Routes

| **Endpoint**        | **Method** | **Description**                  |
|---------------------|------------|----------------------------------|
| `/stock`            | `GET`      | Get a list of all stocks.        |
| `/stock`            | `POST`     | Add new stock.                   |
| `/stock/:id`        | `DELETE`   | Delete a stock by ID.            |
| `/stock/:id`        | `PUT`      | Update stock details.            |

### Sales Routes

| **Endpoint**        | **Method** | **Description**                  |
|---------------------|------------|----------------------------------|
| `/sales`            | `GET`      | Get a list of all sales.         |
| `/sales`            | `POST`     | Add a new sale.                  |
| `/sales/:id`        | `DELETE`   | Delete a sale by ID.             |
| `/sales/:id`        | `PUT`      | Update sale details.             |

### Stock Allocation Routes

| **Endpoint**                         | **Method** | **Description**                           |
|--------------------------------------|------------|-------------------------------------------|
| `/allocate-stock`                    | `GET`      | Get a list of all stock allocations (Admin only). |
| `/allocate-stock/:kioskOwnerId`      | `GET`      | Get stock allocations for a specific kiosk owner. |
| `/allocate-stock`                    | `POST`     | Allocate stock to a kiosk owner.          |
| `/allocate-stock/:id`                | `DELETE`   | Delete a stock allocation by ID.          |
| `/allocate-stock/:id`                | `PUT`      | Update a stock allocation by ID.          |

### Return Request Routes

| **Endpoint**                         | **Method** | **Description**                           |
|--------------------------------------|------------|-------------------------------------------|
| `/return-request`                    | `POST`     | Request a return for allocated stock.     |
| `/return-requests`                   | `GET`      | Get a list of all return requests.        |
| `/return-requests/:kioskOwnerId`     | `GET`      | Get return requests for a specific kiosk owner. |
| `/approve-return-request/:id`        | `PUT`      | Approve a return request.                 |
| `/return-request/:id`                | `DELETE`   | Reject a return request.                 |

---

Feel free to adjust or expand this documentation as needed for your specific project.
