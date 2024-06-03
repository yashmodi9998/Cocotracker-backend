# Coconut Juice Inventory (CocoTracker) - Backend

## Project Overview

The Coconut Juice Inventory Management System is a web application designed to help small businesses manage their coconut juice inventory. It simplifies the process of tracking inventory, ensuring there is enough stock to meet demand, and avoiding stockouts. The system tracks the amount of coconut juice available, where it's stored, and daily sales.

This project focuses on the backend development using Node.js, Express.js, and MongoDB. The backend API handles CRUD operations for various collections in the MongoDB database.

## Collections

### Users Collection(DONE)

| Field    | Description                     |
|----------|---------------------------------|
| userID   | Unique identifier for the user  |
| name     | Name of the user                |
| email    | Email address of the user       |
| phoneNumber    | Phone num of the user       |
| password | Password for user authentication|
| role     | Role of the user (admin/kiosk owner) |

### Kiosk Stores Collection(DONE)

| Field       | Description                             |
|-------------|-----------------------------------------|
| storeID     | Unique identifier for the store         |
| storeName   | Name of the store                       |
| address     | Address of the store                    |
| contactInformation | Contact information for the store       |

### Stock Collection(DONE)

| Field       | Description                             |
|-------------|-----------------------------------------|
| ID          | Unique identifier for the stock entry   |
| date        | Date of the stock entry                 |
| quantity    | Quantity of juice in stock              |
| supplierName| Name of the supplier                    |

### Sales Collection(DONE)

| Field        | Description                              |
|--------------|------------------------------------------|
| storeID      | Identifier for the store                 |
| quantitySold | Quantity of juice sold                   |
| kioskOwnerID | Identifier for the kiosk owner           |
| date    | date of sales       |
| storeName    | Name of the store       |
| kioskOwner    | Name of the kiosk owner      |

### Return Stock Collection(DONE)

| Field          | Description                              |
|----------------|------------------------------------------|
| storeID        | Identifier for the store                 |
| kioskOwnerId        | Identifier for the kiosk owner                 |
| remainingStock | Quantity of juice returned             |
| reason | Reason for returning the juice          |
| status   |status of the request         |
| dateRequested        | Date of the returnRequest                 |
| dateApproved        | Date of return request approved                 |


### Fridge Stock Collection(TODO)

| Field    | Description                     |
|----------|---------------------------------|
| date     | Date of the stock entry         |
| ID       | Unique identifier for the stock entry  |
| quantity | Quantity of juice in stock      |

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

The API provides the following endpoints to interact with the collections:

### User Routes

| HTTP Method | Endpoint | Description           |
|-------------|----------|-----------------------|
| GET         | /        | Get all users         |
| POST        | /        | Add a new user        |
| DELETE      | /:id     | Delete a user by ID   |
| PUT         | /:id     | Update a user by ID   |

### Store Routes

| HTTP Method | Endpoint      | Description             |
|-------------|---------------|-------------------------|
| GET         | /stores       | Get all stores          |
| POST        | /stores       | Add a new store         |
| DELETE      | /stores/:id   | Delete a store by ID    |
| PUT         | /stores/:id   | Update a store by ID    |

### Stock Routes

| HTTP Method | Endpoint      | Description            |
|-------------|---------------|------------------------|
| GET         | /stock        | Get all stock          |
| POST        | /stock        | Add a new stock        |
| DELETE      | /stock/:id    | Delete a stock by ID   |
| PUT         | /stock/:id    | Update a stock by ID   |

### Sales Routes

| HTTP Method | Endpoint      | Description            |
|-------------|---------------|------------------------|
| GET         | /sales        | Get all sales          |
| POST        | /sales        | Add a new sale         |
| DELETE      | /sales/:id    | Delete a sale by ID    |
| PUT         | /sales/:id    | Update a sale by ID    |

### ReturnStock Controller

| HTTP Method | Endpoint                     | Description                            |
|-------------|------------------------------|----------------------------------------|
| POST        | `/allocate`                  | Route for stock allocation             |
| POST        | `/return-request`            | Route for submitting a return request  |
| PUT         | `/approve-return/:id`        | Route for approving a return request   |
| GET         | `/return-requests/approved`  | Route to get all approved requests     |
| GET         | `/return-requests/pending`   | Route to get all pending requests      |
| GET         | `/allocated-stock`           | Route to get all allocated stocks      |

