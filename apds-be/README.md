# Bulletin Board Backend

This is a bulletin board application built with Node.js and Express.js for the backend. It provides endpoints for user registration, login, and posting messages. 

## Getting Started

To get started with this application, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/bulletinboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd bulletinboard
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

## API Endpoints

### User Registration

- **POST** `/api/users/signup`
  
  Register a new user with a unique username, password, and department.

### User Login

- **POST** `/api/users/login`
  
  Authenticate a user by providing a valid username and password. This endpoint returns a JSON web token (JWT) for accessing protected routes.

### Posting Messages

- **GET** `/api/posts`
  
  Get all the posts from the bulletin board.

- **POST** `/api/posts`
  
  Create a new post on the bulletin board. Requires authentication with a valid JWT.

- **DELETE** `/api/posts/:id`
  
  Delete a post by its ID. Requires authentication with a valid JWT.

## Security Features

- **Rate Limiting:** The application implements rate limiting to prevent brute force attacks on user registration and login.

- **Token-Based Authentication:** JWTs are used for user authentication, providing a secure way to access protected routes.

- **HTTPS:** The server uses HTTPS to encrypt data transmitted between the client and server, ensuring data confidentiality and integrity.

- **Helmet Middleware:** The application uses the Helmet middleware to set HTTP security headers to protect against common web vulnerabilities.

## Credits

- This project is based on a lab guide from The Independent Institute of Education.

- Authentication rate limiting is implemented using [Express Brute](https://www.npmjs.com/package/express-brute).
