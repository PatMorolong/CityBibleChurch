# Website Backend

This project is a backend application for a website that requires user authentication for all pages except the homepage. It is built using Node.js and Express, and it connects to a database to manage user data.

## Project Structure

```
website-backend
├── src
│   ├── app.js                # Entry point of the application
│   ├── config
│   │   └── db.js            # Database connection logic
│   ├── controllers
│   │   ├── authController.js # Handles user authentication
│   │   └── userController.js # Manages user-related operations
│   ├── middlewares
│   │   └── authMiddleware.js # Checks user authentication
│   ├── models
│   │   └── User.js          # User model definition
│   ├── routes
│   │   ├── authRoutes.js     # Authentication routes
│   │   └── userRoutes.js     # User-related routes
│   └── utils
│       └── helpers.js        # Utility functions
├── package.json              # NPM configuration file
├── .env                      # Environment variables
├── .gitignore                # Files to ignore by Git
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd website-backend
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables. Example:
   ```
   DATABASE_URL=mongodb://localhost:27017/yourdbname
   JWT_SECRET=your_jwt_secret
   ```

## Usage

1. Start the application:
   ```
   npm start
   ```

2. The server will run on `http://localhost:3000` (or the port specified in your configuration).

## API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in an existing user

- **User**
  - `GET /api/user/profile` - Get user profile (protected route)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.