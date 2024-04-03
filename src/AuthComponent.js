import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "universal-cookie";
import env from "./env";
import { Button } from "react-bootstrap";

const cookies = new Cookie();
const token_ = cookies.get(env.token);

export default function AuthComponent() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // set configuration for the API call here
    const config = {
      method: "GET",
      url: `${env.baseUrl}/auth`,
      headers: {
        Authorization: `Bearer ${token_}`,
      },
    };

    //make the API call
    axios(config)
      .then((result) => {
        //assign the message in our result to the message we initiliazed above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    //destroy cookie
    cookies.remove(env.token, { path: "/" });
    //redirect user to landing page
    window.location.href = "/";
  };

  return (
    <div className="text-center">
      <h1>Auth Component</h1>
      <h5 className="text-success">{message}</h5>
      <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
