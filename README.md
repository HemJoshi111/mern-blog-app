# MERN Stack Blog Application

> A complete full-stack blogging application built with MongoDB, Express.js, React, and Node.js.

This project is a comprehensive, hands-on demonstration of the MERN stack. It covers all the essential concepts of modern full-stack web development, from user authentication with JWT to protected CRUD operations and a responsive frontend built with React.

## Features

- **User Authentication:** Secure user registration and login using JSON Web Tokens (JWT).
- **Protected Routes:** Frontend and backend routes are protected, ensuring only authenticated users can perform certain actions.
- **Full CRUD Operations:** Users can Create, Read, Update, and Delete their own blog posts.
- **Authorization:** Users can _only_ edit or delete posts that they have authored.
- **Responsive Frontend:** The UI is built with React and custom CSS to be clean, modern, and mobile-friendly.
- **State Management:** Uses React's Context API to manage global authentication state.
- **API Error Handling:** A centralized API client (Axios) and backend error middleware provide clear and consistent error notifications to the user.

## Tech Stack

This project is built with the following technologies:

- **Backend:**

  - **Node.js:** JavaScript runtime environment.
  - **Express.js:** Web framework for Node.js.
  - **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
  - **bcrypt.js:** For hashing user passwords.
  - **JSON Web Token (JWT):** For secure authentication.
  - **`dotenv`:** For managing environment variables.
  - **`cors`:** For enabling Cross-Origin Resource Sharing.

- **Frontend:**

  - **React:** JavaScript library for building user interfaces.
  - **React Hooks:** (e.g., `useState`, `useEffect`, `useContext`).
  - **React Context API:** For global state management (auth).
  - **React Router:** For client-side routing and protected routes.
  - **Axios:** Promise-based HTTP client for API calls.
  - **`react-toastify`:** For displaying notifications.

- **Database:**
  - **MongoDB (Atlas):** A cloud-based NoSQL database.
