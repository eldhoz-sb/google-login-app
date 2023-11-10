

# Google Login App

This is a simple app that demonstrates how to use Google OAuth 2.0 to authenticate users and access their profile information. The app uses VITE React for the frontend and express for the backend server side.

## Prerequisites

- You need to have [Node.js] installed on your machine.
- You need to have a Google account and create a project on the [Google Developers Console]. You also need to enable the Google+ API and generate a client ID and a client secret for your project. While setting up add the below addresses to Authorised JavaScript origins.

```
http://localhost:5173
http://localhost
```

## Setup

- Clone this repository or download the zip file.
- Create a `.env` file in the root folder and another one inside the `backend` folder. In both files, add the following variables:

```
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace `your_google_client_id` and `your_google_client_secret` with the values you obtained from the Google Developers Console.

- In the root folder, run `npm install` to install the dependencies for the frontend.
- In the `backend` folder, run `npm install` to install the dependencies for the backend.

## Run

- To start the backend server, open a terminal and change the directory to `backend`. Then run `npm start`. The server will listen on port 3001 by default.
- To start the frontend development server, open another terminal and run `npm run dev` in the root folder. The server will listen on port 5173 by default and proxy any requests to the backend server.
- Open your browser and go to `http://localhost:5173`. You should see a button that says "Login with Google". Click on it and follow the instructions to sign in with your Google account. You should see your name, email, and profile picture on the screen. You can also click on "Logout" to sign out of your account.