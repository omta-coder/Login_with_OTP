import React, { useState } from "react";
import "../styles/mix.css";
import { ToastContainer, toast } from "react-toastify";
import {registerfunction} from "../services/Apis"
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [passhow, setPassShow] = useState(false);
  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
  });

  const Navigate = useNavigate()

  
//setinputvalue
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };


  //register data

  const submitHandler = async(e) =>{
    e.preventDefault();
    const {fname,email,password} = inputdata;

    if(fname === ""){
      toast.error("Enter Your Name");
    }
    else if(email == ""){
      toast.error("Enter Your Email");
    }
    else if(!email.includes("@")){
      toast.error("Enter valid Email");
    }
    else if(password === ""){
      toast.error("Enter Your Password");
    }
    else if(password.length < 6){
      toast.error("Password minimum 6 character");
    }
    else{
      const response = await registerfunction(inputdata);
      console.log(response);
      
      if(response.status === 200){
        setInputdata({...inputdata,fname:"",email:"",password:""});
        Navigate("/");
      }
      else{
        toast.error(response.response.data.error);
      }
    }
  }


  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign Up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using Project Cloud to manage your
              tasks! We hope that you will get like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                onChange={changeHandler}
                type="name"
                name="fname"
                placeholder="Enter Your Name"
              />
              <label htmlFor="email">Email</label>
              <input
                onChange={changeHandler}
                type="email"
                name="email"
                placeholder="Enter Your Email Address"
              />
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  onChange={changeHandler}
                  type={!passhow ? "password" : "text"}
                  name="password"
                  placeholder="Enter Your Password"
                />
                <div className="showpass" onClick={() => setPassShow(!passhow)}>
                  {!passhow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={submitHandler}>Sign Up</button>
            <p>Dont't have an account? </p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;
