// import form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import './App.css';

function Signin() {
  //set initial state
  const [submitted, setSubmitted] = useState(false);
  const [policyRef, setPolicyRef] = useState("");
  const [coverType, setCoverType] = useState("");
  const [address, setAddress] = useState("");
  const [car, setCar] = useState("");


  // define const and headers
  const url_token = "https://api.bybits.co.uk/auth/token";
  const url_policy = "https://api.bybits.co.uk/policys/details";
  const username = document.getElementById("username");
  const password = document.getElementById("password")
  const options = {
    method: "POST",
    headers: {
      "environment": "mock",
      "Content-type": "application/json"
    },
    body: JSON.stringify(
        {
          "username": `${username}`,
          "password": `${password}`,
          "type": "USER_PASSWORD_AUTH"
        }
      )
  };

  //fetch data on submit
  const handleSubmit = (e) => {
    fetch(url_token, options)
      .then(response => response.json())
      .then(data => {
        const accessToken = data.access_token;
        console.log(accessToken);
        const headers = {
            "environment": "mock",
            "Authorization": `Bearer ${accessToken}`,
            "Content-type": "application/json"
        };
        fetch(url_policy, {headers})
          .then(response => response.json())
          .then(data => {
            console.log(data);
            const policyRef = data.policy.policy_ref;
            const coverType = data.policy.cover;
            const car = `${data.vehicle.make} ${data.vehicle.colour} ${data.vehicle.reg}`;
            const address = `${data.policy.address.line_1}, ${data.policy.address.line_2}, ${data.policy.address.postcode}`;
            setPolicyRef(policyRef);
            setCoverType(coverType);
            setCar(car);
            setAddress(address);
          })
      })
    setSubmitted(true);
  }

  if (submitted) {
    return(
      <div>
        <h2>My Policy</h2>
        <br />
        <h4>Policy reference:</h4>
        <p>{policyRef}</p>
        <h4>Cover type:</h4>
        <p>{coverType}</p>
        <h4>Car:</h4>
        <p>{car}</p>
        <h4>Address:</h4>
        <p>{address}</p>
      </div>

      )
  }

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="username">User name: </label>
          <input type="username" className="form-control" id="username"/>
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password"/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}


function App() {
  return (
      <Signin />
  );
}

export default App;
