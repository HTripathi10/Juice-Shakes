import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",geolocation:""});

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation}));
        const response = await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.geolocation})
        });
        response.json()
  .then(json => {
    console.log(json);
    
    if (!json.success) {
      alert("enter valid credentials");
    }
  })
  .catch(error => {
    // Handle the error here
    console.error(error);
  });

    }

    const onChange = (event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    <>
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
  <div className="row justify-content-center">
    <div>
      <h1 className="navbar-brand fst-italic text-warning" style={{fontSize:"50px"}}>Juice&Shakes</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="name"
            value={credentials.name}
            onChange={onChange}
            placeholder='Name'
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder='Email Address'
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            value={credentials.password}
            onChange={onChange}
            id="exampleInputPassword1"
            placeholder='Password'
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="geolocation"
            value={credentials.geolocation}
            onChange={onChange}
            id="geolocation"
            placeholder='Address'
          />
        </div>
        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/login" className="btn btn-warning text-white">Already a User</Link>
        </div>
      </form>
    </div>
  </div>
</div>


    </>
  )
}
