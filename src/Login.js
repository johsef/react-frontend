import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import env from "./env";
import Cookies from "universal-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);

  const cookies = new Cookies();

  const handleSubmit = (e) => {
    //prevent the form from refreshing the whole page
    e.preventDefault();
    // set cofiguration
    const configuration = {
      method: "POST",
      url: `${env.baseUrl}/login`,
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setLogin(true);
        cookies.set(env.token, result.data.token, { path: "/" });
        window.location.href = "/auth";
      })
      .catch((error) => {
        error = new Error();
      });
  };
  return (
    <>
      <h2>Login</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
        {/* Email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* Submit button */}
        <Button
          className="mt-3"
          type="submit"
          variant="primary"
          onSubmit={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </Form>
      {/* Display success message */}
      {login ? (
        <p className="text-success">You are logged in successfully</p>
      ) : (
        <p className="text-danger"> You are not logged in</p>
      )}
    </>
  );
}
