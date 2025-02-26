# Stationary shop client

## Redux Toolkit Query Setup

This project uses Redux Toolkit Query to handle API requests, authentication, and automatic token refreshing in a React application with TypeScript.

## Redux Store Configuration with Redux Toolkit and Redux Persist

This configuration sets up a Redux store using Redux Toolkit and Redux Persist to manage authentication, cart, and order states in a React application.

## Key Features:

- State Management: Utilizes @reduxjs/toolkit for efficient state management.
- Persistent Storage: Saves authentication and cart state in localStorage using redux-persist.
- API Integration: Integrates RTK Query for efficient data fetching and caching.

## Redux Persist Configuration:

- key: "root": Sets the root key for persisted state.
- storage: Uses localStorage to store the state.


## useAppDispatch

- This is a wrapper for useDispatch that uses the AppDispatch type from the store.
- Ensures that all dispatched actions are properly typed.

## useAppSelector

- This is a wrapper for useSelector that uses the RootState type from the store.
- It provides TypeScript support for state selection, reducing errors when accessing state properties.

## Base API Configuration

We use fetchBaseQuery from Redux Toolkit Query to define a base API service. The configuration handles:

- Setting the base URL for all API requests.
- Including authentication tokens in headers.
- Automatically refreshing expired tokens.

# Base URL

- All API requests are routed through the backend server:

```
baseUrl: "https://satationary-server.vercel.app/"
```

## Authentication Handling

This setup ensures secure API communication by:

- Attaching the Bearer token to all outgoing requests for authentication.
- Using Refresh Tokens to automatically refresh expired tokens.

## Automatic Token Refresh:

- If the API response is 401 Unauthorized, it triggers the token refresh flow.
- A request is sent to the /auth/refresh-token endpoint.
- If a new access token is received:
- The token is updated in the Redux store.
- The original API request is retried with the new token.
- If no token is received, the user is logged out.

## Why Use credentials: "include"?

- This allows cookies (e.g., refresh tokens) to be sent with the request, ensuring a secure token refresh flow.
