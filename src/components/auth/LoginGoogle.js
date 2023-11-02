import React, { useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GoogleOAuthProvider } from '@react-oauth/google';
import toast from "react-hot-toast";
import { GoogleLogin } from '@react-oauth/google';
// import { FcGoogle } from 'react-icons/fc';
const API = 'your_api_endpoint_here';
const GOOGLE_CLIENT_ID = process.env.REACT_APP__GOOGLE_CLIENT_ID;


const LoginGoogle = () => {
  const handleGoogleResponse = (response) => {
    const user2 = jwtDecode(response.credential);
    loginWithGoogle(user2).then(data => {
      if (data.error) {
        toast.error("An Error Occurred " + data.error);

        console.log(data.error);
      } else {
        toast.success("Welcome " + data.user.name);

        handleAuthentication(data);
      }
    });
  };

  const handleAuthentication = (data) => {
    // Handle authentication logic here
    console.log("Handle",data);
    // return
    if (data.user?.role === 'Admin') {
      window.location.href = '/admin/home';
    } else if (data.user?.role === 'Subscriber') {
      window.location.href = '/subscriber/home';
    } else if (data.user?.role === 'Trial') {
      window.location.href = '/trial/home';
    } else {
      window.location.href = '/user/home';
    }
  };

  const loginWithGoogle = async (user2) => {
    try {
      const response = await axios.post(`/google-login`, user2, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem("auth", JSON.stringify(response.data));
      return response.data;
    } catch (err) {
      console.log(err);
      return { error: 'An error occurred' };
    }
  };

 

  return (

    <GoogleOAuthProvider 
      clientId={`${GOOGLE_CLIENT_ID}`}
    >
      <GoogleLogin
        render={(renderProps) => (
          <button
            type="button"
            className=""
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Sign in with Google
          </button>
        )}
        onSuccess={handleGoogleResponse}
        onFailure={handleGoogleResponse}
        cookiePolicy="single_host_origin"
      />
    </GoogleOAuthProvider>

  );
};

export default LoginGoogle;