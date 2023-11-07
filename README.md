# Inter-Departmental Bulletin Board

The National Government has established an Inter-Departmental Bulletin Board to facilitate collaboration among various government departments. This platform is dedicated to addressing highly confidential issues that require the collective efforts of multiple departments to resolve. To ensure the highest level of security, access to this system is restricted to authorized users only.

This repository comprises both the backend API and the frontend interface, each developed with security, confidentiality, and user-friendliness in mind. Here's an overview of the key features and components:

## Getting Started

To get started with this application, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/TrinityJayd/Bulletin-Board.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Bulletin-Board
   ```

3. Install the project dependencies for both the frontend and backend:

   ```bash
   npm install
   ```

4. Fore the backend you can add your own .env file with the mongodb database url.
   
   ```bash
   DATABASE_URL = {URL}
   ```

5. Start the server:

   ```bash
   npm start
   ```
   
## Backend API

### MongoDB Setup
The system utilizes MongoDB as the database to securely store and manage confidential issue data. The MongoDB database is hosted in the cloud to ensure scalability and reliability.

### SSL Encryption
To provide strong security, all communication with the backend API, including database requests, is encrypted using SSL (Secure Sockets Layer) certificates. An SSL certificate and private key have been generated to establish secure connections.

### Post Management
Authorized users can use the system to Get, Create, and Delete posts. This functionality allows for efficient collaboration on pressing issues.

### User Management
The backend API includes endpoints for user registration and login. New users can register their accounts, while existing users can securely log in to access the platform's features.

### Security Measures
- **CORS (Cross-Origin Resource Sharing):** Cross-origin resource sharing is implemented to control which domains are allowed to access the API, enhancing security.
- **Password Handling:** User passwords are securely hashed and not stored as plaintext. Passwords are obscured, and sensitive information is treated with the utmost care.
- **Routes:** Separate routes are established for posts and users, with access restrictions to protect the system's confidential content.
- **Session Persistence:** User login information is persisted after successful authentication, offering a seamless experience.

### Security Packages
Additional security packages are incorporated into the backend, including:
- **Express-Brute:** This package helps mitigate brute force attacks by limiting the number of login attempts.
- **Helmet:** Helmet is used to enhance the security of HTTP headers, safeguarding against common web vulnerabilities.

## Frontend

### Post Management
The frontend interface allows authorized users to view, create, and delete posts. This functionality fosters collaboration and issue tracking.

### User Management
Users can register new accounts or log in to existing ones through the user-friendly interface.

### Secure Communication
To ensure data security, the frontend communicates with the backend API through secure services, maintaining the confidentiality of sensitive information.

### Input Validation and Sanitization
Input fields are validated to ensure data integrity, and proper password obscuring techniques are implemented. Sanitization of input data protects the system from potential security vulnerabilities.

