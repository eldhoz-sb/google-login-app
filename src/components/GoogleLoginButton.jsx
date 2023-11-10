import React, {useState} from 'react';
import { GoogleLogin } from '@react-oauth/google';
import Dashboard from './Dashboard';

const GoogleLoginButton = ({ onSuccess }) => {
  const [serverData, setServerData] = useState(null);
  
  const handleSuccess = async (response) => {
    try {
      // Send the Google access token to the server
      const serverResponse = await fetch('http://localhost:3001/handleAccessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ credentials: response.credential }),
    });

      const responseData = await serverResponse.json();
      onSuccess(responseData);
    } catch (error) {
      console.error('Error connecting to the server:', error);
    }
  };




  return (
    <div>
    <GoogleLogin
      onSuccess={handleSuccess}
      clientId={import.meta.env.VITE_CLIENT_ID}
    />
    {serverData && <Dashboard data={serverData} />}
    </div>
  );
};

export default GoogleLoginButton;

