
# Project Name
 
## Overview
 
This project is a web application built using Node.js and Express. It includes various routes for user authentication, user management, restaurant management, category management, and food management. The application also serves static HTML files for frontend interactions.
 
## Table of Contents
 
1. Installation
2. Usage
3. Routes
    - Authentication Routes
    - User Routes
    - Restaurant Routes
    - Category Routes
    - Food Routes
    - Frontend Routes
4. Error Handling
5. Database Configuration
 
## Installation
 
1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd <project-directory>
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables:
    ```env
    MONGO_URL=<your-mongodb-url>
    JWT_SECRET=<your-jwt-secret>
    ```
 
## Usage
 
1. Start the server:
    ```bash
    npm start
    ```
2. The server will run on `http://localhost:5000`.
 
## Routes
 
### Authentication Routes
 
- **Register**
    - **URL**: `/api/v1/auth/register`
    - **Method**: `POST`
    - **Description**: Registers a new user.
    - **Request Body**:
        ```json
        {
            "userName": "string",
            "email": "string",
            "password": "string",
            "phone": "string",
            "address": "array",
            "userType": "string",
            "answer": "string"
        }
        ```
 
- **Login**
    - **URL**: `/api/v1/auth/login`
    - **Method**: `POST`
    - **Description**: Logs in an existing user.
    - **Request Body**:
        ```json
        {
            "email": "string",
            "password": "string"
        }
        ```
 
### User Routes
 
- **Get User**
    - **URL**: `/api/v1/user/getUser`
    - **Method**: `GET`
    - **Description**: Retrieves the logged-in user's data.
 
- **Update User**
    - **URL**: `/api/v1/user/updateUser/:id`
    - **Method**: `PUT`
    - **Description**: Updates user information.
    - **Request Body**:
        ```json
        {
            "userName": "string",
            "email": "string",
            "phone": "string",
            "address": "array",
            "userType": "string"
        }
        ```
 
- **Update Password**
    - **URL**: `/api/v1/user/updatePassword`
    - **Method**: `POST`
    - **Description**: Updates the user's password.
    - **Request Body**:
        ```json
        {
            "oldPassword": "string",
            "newPassword": "string"
        }
        ```
 
- **Reset Password**
    - **URL**: `/api/v1/user/resetPassword`
    - **Method**: `POST`
    - **Description**: Resets the user's password.
    - **Request Body**:
        ```json
        {
            "email": "string",
            "newPassword": "string",
            "answer": "string"
        }
        ```
 
- **Delete User**
    - **URL**: `/api/v1/user/deleteUser/:id`
    - **Method**: `DELETE`
    - **Description**: Deletes a user by ID.
 
### Restaurant Routes
 
- **Create Restaurant**
    - **URL**: `/api/v1/restaurant/createRestaurant`
    - **Method**: `POST`
    - **Description**: Creates a new restaurant.
    - **Request Body**:
        ```json
        {
            "title": "string",
            "address": "array",
            "time": "string",
            "pickup": "boolean",
            "delivery": "boolean",
            "isOpen": "boolean",
            "logoUrl": "string",
            "rating": "number",
            "ratingCount": "string",
            "code": "string"
        }
        ```
 
- **Get All Restaurants**
    - **URL**: `/api/v1/restaurant/getAll`
    - **Method**: `GET`
    - **Description**: Retrieves all restaurants.
 
- **Get Restaurant by ID**
    - **URL**: `/api/v1/restaurant/get/:id`
    - **Method**: `GET`
    - **Description**: Retrieves a restaurant by ID.
 
- **Update Restaurant**
    - **URL**: `/api/v1/restaurant/update/:id`
    - **Method**: `PUT`
    - **Description**: Updates restaurant information.
    - **Request Body**:
        ```json
        {
            "title": "string",
            "address": "array",
            "time": "string",
            "pickup": "boolean",
            "delivery": "boolean"
        }
        ```
 
- **Delete Restaurant**
    - **URL**: `/api/v1/restaurant/delete/:id`
    - **Method**: `DELETE`
    - **Description**: Deletes a restaurant by ID.
 
### Category Routes
 
- **Create Category**
    - **URL**: `/api/v1/category/create`
    - **Method**: `POST`
    - **Description**: Creates a new category.
    - **Request Body**:
        ```json
        {
            "title": "string",
            "imageUrl": "string"
        }
        ```
 
- **Get All Categories**
    - **URL**: `/api/v1/category/getAll`
    - **Method**: `GET`
    - **Description**: Retrieves all categories.
 
- **Get Category by ID**
    - **URL**: `/api/v1/category/get/:id`
    - **Method**: `GET`
    - **Description**: Retrieves a category by ID.
 
- **Update Category**
    - **URL**: `/api/v1/category/update/:id`
    - **Method**: `PUT`
    - **Description**: Updates category information.
    - **Request Body**:
        ```json
        {
            "title": "string",
            "imageUrl": "string"
        }
        ```
 
- **Delete Category**
    - **URL**: `/api/v1/category/delete/:id`
    - **Method**: `DELETE`
    - **Description**: Deletes a category by ID.
 
### Food Routes
 
- **Create Food**
    - **URL**: `/api/v1/food/create`
    - **Method**: `POST`
    - **Description**: Creates a new food item.
    - **Request Body**:
        ```json
        {
            "title": "string",
            "description": "string",
            "price": "number",
            "imageUrl": "string",
            "foodTags": "string",
            "category": "string",
            "code": "string",
            "isAvailable": "boolean",
            "restaurant": "string",
            "rating": "number",
            "ratingCount": "string"
        }
        ```
 
- **Get All Food**
    - **URL**: `/api/v1/food/getAll`
    - **Method**: `GET`
    - **Description**: Retrieves all food items.
 
- **Get Food by ID**
    - **URL**: `/api/v1/food/get/:id`
    - **Method**: `GET`
    - **Description**: Retrieves a food item by ID.
 
- **Get Food by Restaurant ID**
    - **URL**: `/api/v1/food/getByRestaurant/:id`
    - **Method**: `GET`
    - **Description**: Retrieves food items by restaurant ID.
 
- **Update Food**
    - **URL**: `/api/v1/food/update/:id`
    - **Method**: `PUT`
    - **Description**: Updates food item information.
    - **Request Body**:
        ```json
        {
            "title": "string",
            "description": "string",
            "price": "number",
            "imageUrl": "string",
            "foodTags": "string",
            "category": "string",
            "code": "string",
            "isAvailable": "boolean",
            "restaurant": "string",
            "rating": "number",
            "ratingCount": "string"
        }
        ```
 
- **Delete Food**
    - **URL**: `/api/v1/food/delete/:id`
    - **Method**: `DELETE`
    - **Description**: Deletes a food item by ID.
 
- **Place Order**
    - **URL**: `/api/v1/food/placeOrder`
    - **Method**: `POST`
    - **Description**: Places a new order.
    - **Request Body**:
        ```json
        {
            "cart": "array",
            "id": "string"
        }
        ```
 
- **Update Order Status**
    - **URL**: `/api/v1/food/orderStatus/:id`
    - **Method**: `POST`
    - **Description**: Updates the status of an order.
    - **Request Body**:
        ```json        {
            "status": "string"
        }
        ```
 
### Frontend Routes
 
- **User CRUD**
    - **URL**: `/userCrud`
    - **Method**: `GET`
    - **Description**: Serves the `UsersCrud.html` file for user management.
 
- **Login**
    - **URL**: `/login`
    - **Method**: `GET`
    - **Description**: Serves the `login.html` file for user login.
 
- **Register**
    - **URL**: `/register`
    - **Method**: `GET`
    - **Description**: Serves the `register.html` file for user registration.
 
- **Restaurant CRUD**
    - **URL**: `/restaurantCRUD`
    - **Method**: `GET`
    - **Description**: Serves the `restaurantCRUD.html` file for restaurant management.
 
- **Category Management**
    - **URL**: `/category`
    - **Method**: `GET`
    - **Description**: Serves the `categories.html` file for category management.
 
## Error Handling
 
The application includes a global error handler that catches and logs errors, then sends a JSON response with a status code of 500 and an error message.
 
## Database Configuration
 
The application uses MongoDB for the database. The connection is established using Mongoose. Ensure that the `MONGO_URL` environment variable is set in your `.env` file.
 

