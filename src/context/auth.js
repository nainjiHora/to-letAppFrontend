import React from "react";
import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
    profile: {
      name: "",
      email: "",
      website: "",
      password: "",
      role: "",
      image: "",
    },
  });
  const history = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setAuth(JSON.parse(localStorage.getItem("auth")));
    }
  }, []);

  if (process.env.REACT_APP_NODE_ENV) {
    axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    axios.defaults.baseURL = process.env.REACT_APP_NEXT_PUBLIC_API;
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }

  axios.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      let res = error.response;
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        setAuth({
          user: null,
          token: "",
        });
              localStorage.removeItem("auth");
        history.push("/signin");
        console.log("LOGOUT FORCECULLY ======> ");
      }
    }
  );

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
