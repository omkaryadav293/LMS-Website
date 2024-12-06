// Login.jsx
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/auth-context";
import { LiaPlaystation } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();
    const {LoginFormData, setLoginFormData, handleLoginUser,errorMessage, setErrorMessage} = useContext(AuthContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginFormData({ ...LoginFormData, [name]: value });
        setErrorMessage("");
    };

    const handleNavigate = ()=>{
        navigate("/");
    }


 

    return (
      
        <div className="auth-page">
             <div className="header-center" style={{
                position: "absolute",
                top:15,
                left:20,
             }}>
            <div onClick={handleNavigate} className="header-icon">
            <LiaPlaystation size={32}/>

          </div>
          <h1 onClick={handleNavigate} className="header-name">L M S</h1>
            </div>
            <form className="auth-form" onSubmit={handleLoginUser}>
                <h2>Welcome Back!</h2>
                <input
                    type="email"
                    placeholder="Email"
                    name = "email"
                    value={LoginFormData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    name= "password"
                    value={LoginFormData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </form>
        </div>
        
    );
}

 