# Authentication with JWT in Express.js

This project implements authentication with JSON Web Tokens (JWT) using Express.js. It includes various routes for user authentication and management.

## Routes

1. **POST /register**: Register a new user.
2. **POST /login**: Login with email and password to receive token.
3. **GET /logout**: Logout and invalidate the user's token.
4. **POST /forgotpasswordtoken**: Initiate the password reset process and send a token to the user's email.
5. **PUT /passwordReset**: Update the user's password.
6. **PUT /passwordReset/:token**: Reset the user's password using a password reset token.
7. **DELETE /delete/:id**: Delete a user account (admin only).
8. **GET /refresh_token**: Refresh the access token using a refresh token.

## Usage

1. Clone the repository:

```
git clone https://github.com/ons-khiari/AuthenticationJWT.git
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables by creating a .env file in the root directory. Define the following environment variables:
```
PORT=3000
DATA_BASE_URL= your_mongodb_URL
JWT_REFRESH_TOKEN_SECRET= your_refresh_token_secret
JWT_TOKEN_SECRET= your_access_token_secret
MAIL_ADDRESS= your_email_address
MAIL_PASSWORD= your_email_password // you need to use "App passwords" in your google account
CLIENT_URL=http://localhost:3000
```

4. Start the server:
```
npm start
```

## Controbuting

Contributions are welcome! If you have suggestions, feature requests, or bug reports, please open an issue or submit a pull request.