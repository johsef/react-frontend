import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import env from "./env";

export default function FreeComponent(){
  const [message, setMessage] = useState("");

  //useEffect automatically executes once the page is fully loaded
  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: "GET",
      url: `${env.baseUrl}/free`
    };

    //make the API call
    axios(configuration)
    .then(
      (result) => {
        //assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      }
    ).catch(
      (error)=>{
        error = new Error();
      }
    );
  }, [])
  return (
    <div>
      <h1 className='text-center'>Free component</h1>
      {/* Displays our message from our API call */}
        <h5 className='text-center text-info'>{message}</h5>
    </div>
  );
}