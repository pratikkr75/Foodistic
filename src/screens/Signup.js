import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '', // Keep the field name as 'geolocation'
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (!/^[a-zA-Z ]+$/.test(credentials.name.trim())) {
      alert('Name must contain only letters.');
      return;
    }

    if (!credentials.geolocation.trim()) {
      alert('Location is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: credentials.name.trim(),
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation.trim(), // Change the field name here
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        alert(`Failed to create user. Server response: ${JSON.stringify(errorMessage)}`);
        return;
      }

      const json = await response.json();
      console.log(json);

      if (!json.success) {
        alert('Enter Valid Credentials');
      } else {
        // Set the authToken in localStorage upon successful user creation
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        alert('User created successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('There was a problem connecting to the server. Please try again later.');
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input type="email" className="form-control" name="email" value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" name="password" value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
          </div>
          <div className="mb-3">
            <label htmlFor="geolocation" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a user
          </Link>
        </form>
      </div>
    </>
  );
}
