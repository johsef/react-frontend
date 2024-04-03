import React from "react";
import {Navigate, useLocation} from "react-router-dom";
import Cookies from "universal-cookie";
import env from "./env";
const cookies = new Cookies();

//receives component and any other props represented by ...rest
export default function ProtectedRoutes({children}) {
    //get cookie from browser if logged in
    const token = cookies.get(env.token);
    let location = useLocation();
    // returns route if there is a valid token set in the cookie
    if (token) {
      return children;
    } else {
      //returns the user to the landing page if there is no valid token set
      return (
        <Navigate
          to={{
            pathname: "/",
            state: {
              //sets the location a user was about to access before being redirected to login
              from: location
            },
          }}
        />
      );
    }
}
