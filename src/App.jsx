import React, { useState } from "react";
import GoogleLoginButton from "./components/GoogleLoginButton"; // Importing Login Button
import Dashboard from "./components/Dashboard"; // Dahboard component for logged in view

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleLogin = (responseData) => {
    console.log("Logged in successfully");
    setUserDetails(responseData);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    console.log("Logged out successfully");
  };

  return (
    <div className="main">
      <div className="container">
        <section className="wrapper">
          {isLoggedIn ? (
            // Show the logged-in view
            <Dashboard data={userDetails} handleLogout={handleLogout} />
          ) : (
            <div className="login-container">
              <h1 className="text text-large">Log in</h1>
            <GoogleLoginButton onSuccess={handleLogin} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default App;
