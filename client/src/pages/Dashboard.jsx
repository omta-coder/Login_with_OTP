import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const userValid = () => {
    let token = localStorage.getItem("userdbtoken");

    if (token) {
      console.log("Valid User");
    } else {
      navigate("*");
    }
  };
  useEffect(() => {
    userValid();
  }, []);

  return (
    <>
    <div className="container mt-3 text-center">
    <h1>Welcome 👋🏼</h1>
    </div>
    </>
  )
};

export default Dashboard;
