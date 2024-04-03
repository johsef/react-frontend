import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import env from './env'

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    //prevent the form from refreshing whole page
    e.preventDefault();
    // set configurations
    const configuration = {
      method: "POST",
      url: `${env.baseUrl}/register`,
      data: {
        email,
        password
      }
    }

    axios(configuration)
    .then(() => {setRegister(true);})
    .catch((error) => {error = new Error();});
  }
  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e)=>handleSubmit(e)}>
        {/* Email */}
        <Form.Group controlId="formRegisterEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
          />
        </Form.Group>

        {/* Password */}
        <Form.Group controlId="formRegisterPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Submit button */}
        <Button className="mt-3" variant="primary" type="submit" onClick={(e)=> handleSubmit(e)}>
          Submit
        </Button>
      </Form>
      {/* Display success message */}
      {register ? (
        <p className="text-success">You have successfully registered</p>
      ) : (<p className="text-danger"> You are not registered</p>)}
    </>
  );
}
