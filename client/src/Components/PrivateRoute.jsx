import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../Redux/action";
import { BackendUrl } from "../Utils/Contants";
import axios from "axios";

function PrivateRoute({ children }) {
  const { token } = useSelector((store) => store);
  const dispatch = useDispatch();

  const getTokenIfGoogleLogin = async () => {
    try {
      const url = `${BackendUrl}auth/google/login`;
      const { data } = await axios.get(url, { withCredentials: true });
      console.log("data:", data);
      const { token } = data;
      dispatch(setToken(token));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTokenIfGoogleLogin();
    //  to ignore the warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
}

export default PrivateRoute;
