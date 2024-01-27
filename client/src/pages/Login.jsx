import React, { useState } from 'react'
import '../styles/mix.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {sentOtpFunction} from '../services/Apis';
import Spinner from 'react-bootstrap/Spinner';


const Login = () => {
  const [email, setEmail] = useState("");
  const [spiner,setSpiner] = useState(false);

  const Navigate = useNavigate()
  
  const sendOtp = async(e) =>{
    e.preventDefault();

    if(email===""){
      toast.error("Enter Your Email!");
    }
    else if(!email.includes("@")){
      toast.error("Enter Valid Email!");
    }
    else{
      setSpiner(true)
      const data = {
        email:email
      }
      const response = await sentOtpFunction(data);
      
      if(response.status === 200){
        setSpiner(false)
        Navigate("/user/otp",{state:email});
      }else{
        toast.error(response.response.data.error);
      }

    }

    setEmail("");
  }

  return (
    <>
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Welcome Back, Log In</h1>
          <p>Hi, we are you glad you are back. Please login.</p>
        </div>
        <form>
          <div className="form_input">
            <label htmlFor="email">Email</label>
            <input
            value={email}
             onChange={(e)=>setEmail(e.target.value)} 
             type="email" name="email" id="" placeholder='Enter Your Email Address' />
          </div>
          <button onClick={sendOtp} className="btn">Login
          {
            spiner ? <span><Spinner animation="border" /></span>:""
          }
          </button>
          <p>Dont't have an account? <NavLink to="/register">Sign up</NavLink></p>
        </form>
      </div>
      <ToastContainer />
    </section>
    </>
  )
}

export default Login