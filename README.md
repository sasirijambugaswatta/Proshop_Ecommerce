# Proshop E-commerce Application

Proshop is a full-stack e-commerce application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It allows users to browse and purchase products online.

## Features

- User authentication and authorization
- Product listing and search
- Shopping cart and checkout process
- Payment integration (PayPal)
- Order management and tracking
- Admin panel for managing products, orders, and users

## Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT (JSON Web Tokens) for authentication
  - Bcrypt for password hashing
  - Nodemailer for sending emails
- **Frontend**:
  - React.js
  - Redux for state management
  - React Router for client-side routing
  - Axios for making HTTP requests
  - Bootstrap or Material-UI for UI components and styling

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sasirijambugaswatta/Proshop_Ecommerce.git


2. **Install dependencies**:
    ```bash
    Navigate to the backend folder and run npm install
    Navigate to the frontend folder and run npm install
3. **Set up environment variables**:
    ```bash
    Create a .env file in the backend folder
    Add the necessary environment variables, such as MongoDB connection string, JWT secret, and payment gateway credentials
4. Start the development server:
     ```bash
    Navigate to the backend folder and run npm start
    Navigate to the frontend folder and run npm start
5. Open the application in your browser:
   ```bash
    The backend server will run on http://localhost:5000
    The frontend will run on http://localhost:3000

## Project Structure

- **backend**
  - `routes/` - Contains API routes for products, users, orders, and admin actions
  - `controllers/` - Handles the logic for each API endpoint
  - `models/` - Defines the MongoDB schemas for products, users, and orders
  - `middleware/` - Handles authentication, error handling, and other middleware functions
  - `utils/` - Contains utility functions and helpers
  - `config/` - Stores configuration files, such as database connection and payment gateway settings
- **frontend**
  - `components/` - Contains reusable React components
  - `pages/` - Defines the main pages of the application (e.g., home, product details, cart, checkout)
  - `actions/` - Defines Redux actions for state management
  - `reducers/` - Defines Redux reducers for state management
  - `store/` - Configures the Redux store
  - `utils/` - Contains utility functions and helpers
  - `styles/` - Contains global CSS styles or SCSS files

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please create a new issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
