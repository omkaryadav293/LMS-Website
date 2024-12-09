import React, { useContext } from "react";
import { AuthContext } from "../../context/auth-context";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import { LiaPlaystation } from "react-icons/lia";
import { FaArrowLeftLong } from "react-icons/fa6";

 const Signup = ()=> {
  const navigate = useNavigate();
  const { SignupFormData, setSignupFormData, handleRegisterUser } =
    useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupFormData({ ...SignupFormData, [name]: value });
  };

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div className="auth-page">
      <div
        className="header-center"
        style={{
          position: "absolute",
          top: 15,
          left: 20,
        }}
      >
        <div onClick={() => navigate(-1)} className="header-icon">
          <FaArrowLeftLong size={28} />
        </div>
        <div onClick={handleNavigate} className="header-icon">
          <LiaPlaystation size={32} />
        </div>
        <h1 onClick={handleNavigate} className="header-name">
          L M S
        </h1>
      </div>
      <form className="auth-form" onSubmit={handleRegisterUser}>
        <h2>Create New Account</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={SignupFormData.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={SignupFormData.age}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="number"
          placeholder="Mobile Number"
          value={SignupFormData.number}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={SignupFormData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={SignupFormData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
