# Multilingual FAQ Management System

## Overview

The Multilingual FAQ Management System is a web application built with Node.js and Express.js that allows users to manage frequently asked questions (FAQs) in multiple languages. The application utilizes MongoDB for data storage, Redis for caching, and the Google Gemini API for translation services.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete FAQs.
- **Multilingual Support**: FAQs can be translated into Hindi and Bengali.
- **Caching**: Utilizes Redis for improved performance.
- **User-Friendly API**: Easy-to-use RESTful API for managing FAQs.
- **Docker Support**: Easily deployable using Docker.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Redis
- Google Gemini API
- Docker

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- [MongoDB](https://www.mongodb.com/) (or use Docker)
- [Redis](https://redis.io/) (or use Docker)
- [Docker](https://www.docker.com/) (optional)

### Installation Steps

1. **Clone the Repository**

   ```
   git clone https://github.com/sajalbatra/hiring_at_BharatFD.git
   cd hiring_at_BharatFD
   ```

2. **Install Dependencies**

   Install the required Node.js packages:

   ```
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root of the project using the `.env.example` as a reference:

   ```
   # MongoDB Configuration
   MONGODB_URI=mongodb://admin:password@localhost:27017/multilingual_faq?authSource=admin
   PORT=3000

   # Redis Configuration
   REDIS_HOST=localhost
   REDIS_PORT=6379

   # Google Gemini API Key
   GEMINI_API_KEY=your_gemini_api_key_here

   # JWT Secret for Authentication (if applicable)
   JWT_SECRET=your_secret_key_here
   ```

4. **Start MongoDB and Redis (Optional)**

   If you are not using Docker, make sure your MongoDB and Redis servers are running locally.

5. **Run the Application**

   Start the application:

   ```
   npm start
   ```

6. **Using Docker (Optional)**

   If you prefer to use Docker, you can start all services with:

   ```
   docker-compose up -d
   ```

## API Endpoints

### 1. Create an FAQ

- **Endpoint**: `POST /faqs`
- **Request Body**:
    ```
    {
        "question": "What is your name?",
        "answer": "My name is Sajal."
    }
    ```
- **Response**:
    - Status: `201 Created`
    - Body: The created FAQ object.

### 2. Get All FAQs

- **Endpoint**: `GET /faqs`
- **Query Parameters**:
  - `lang`: Language code (e.g., `en`, `hi`, `bn`)
  
- **Response**:
    - Status: `200 OK`
    - Body: An array of FAQs in the requested language.
![Image for all faq](image.png)
### 3. Update an FAQ

- **Endpoint**: `PUT /faqs/:id`
- **Request Body**:
    ```
    {
        "question": "Updated question?",
        "answer": "Updated answer."
    }
    ```
    ![Hindi Translation](image-1.png)
    ![Bengali Translation](image-2.png)
- **Response**:
    - Status: `200 OK`
    - Body: The updated FAQ object.

### 4. Delete an FAQ

- **Endpoint**: `DELETE /faqs/:id`
- **Response**:
    - Status: `200 OK`
    - Body: Confirmation message.

## Testing

To run unit tests for the application, use:

```
npm test
```

Ensure you have Jest or your preferred testing framework set up in your project.

## Docker Support

The project includes a `Dockerfile` and a `docker-compose.yml` file for easy deployment. To build and run the containers:

```
docker-compose up --build
```

Access the application at `http://localhost:3000`.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Google Gemini API](https://cloud.google.com/generative-ai/docs)

