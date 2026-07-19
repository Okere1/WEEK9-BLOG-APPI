📖 Blog API

A RESTful Blog API built with Node.js, Express.js, and MongoDB. The API allows users to register, authenticate, create blog articles, manage their own posts, search articles, and upload images using Cloudinary.

🚀 Features
User Registration
User Authentication (JWT)
Password Hashing with bcrypt
Protected Routes
Create Articles
Read Articles
Update Articles
Delete Articles
Search Articles
Pagination
Request Validation using Joi
Global Error Handling
Request Logging Middleware
Image Uploads with Cloudinary

🛠 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication
Joi Validation
bcrypt
Cloudinary
Multer
CORS
dotenv

📂 Project Structure
.
├── src
│ ├── config
│ ├── controllers
│ ├── middlewares
│ ├── models
│ ├── routes
│ ├── utils
│ ├── validation
│ └── app.js
├── uploads
├── .env
├── .env.example
├── index.js
├── package.json
└── README.md

⚙️ Installation

Clone the repository
git clone https://github.com/yourusername/blog-api.git

Move into the project
cd blog-api

Install dependencies
npm install

🔐 Environment Variables

Create a .env file in the project root.
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

▶️ Running the Application

Development
npm run dev

Production
npm start

Authentication

After logging in, every protected request should include:
Authorization: Bearer <your_jwt_token>

API Endpoints

Authentication
Register User
POST /api/users/sign-up

Request
{
"name": "John Doe",
"email": "john@example.com",
"password": "password123"
}

Login
POST /api/users/login

Request
{
"email": "john@example.com",
"password": "password123"
}

Response
{
"message": "Logged In",
"user": {
"\_id": "...",
"name": "John Doe",
"email": "john@example.com"
},
"token": "JWT_TOKEN"
}

Articles

Create Article
POST /api/articles

Get All Articles
GET /api/articles

Supports pagination
GET /api/articles?page=1&limit=10

Get Article By ID
GET /api/articles/:id
Update Article
PUT /api/articles/:id

Only the article owner can update.

Delete Article
DELETE /api/articles/:id
Search Articles
GET /api/articles/search?find=node

Uses MongoDB text indexes for full-text search.

Image Upload
POST /upload

Accepts multipart form data and uploads images to Cloudinary.

Validation

Incoming requests are validated using Joi before reaching the controllers.

Examples include:

User Registration
User Login
Create Article
Update Article
Security
Passwords are hashed using bcrypt.
JWT authentication protects private endpoints.
Users can only modify their own articles.
Environment variables are used for sensitive configuration.
Error Handling

The project includes:

Global Error Handler
Request Validation Errors
Authentication Errors
Resource Not Found Responses
Future Improvements
Refresh Tokens
Role-Based Authorization
Swagger/OpenAPI Documentation
Unit & Integration Tests
Rate Limiting
Email Verification
Password Reset
Docker Support
CI/CD Pipeline
API Versioning
Author

Promise Okere

License

This project is licensed under the MIT License.

Suggestions after reviewing your code

Overall, the project demonstrates a solid Express.js architecture with configuration, controllers, middleware, models, routes, validation, and environment management.

If you ever revisit this project, I'd recommend these improvements:

Add Swagger/OpenAPI documentation.
Add Jest or Vitest tests.
Use a centralized logger (e.g., Winston or Pino) instead of console.log.
Standardize API response formats.
Add ESLint and Prettier.
Add Docker support.
Implement refresh tokens.
Add rate limiting and security middleware (Helmet, express-rate-limit).
Use HTTP status constants instead of hardcoded numbers.
Add repository/service layers for better separation of concerns.
