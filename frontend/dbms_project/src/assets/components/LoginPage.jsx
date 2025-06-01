import React, { useEffect } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/login.css'

const LoginPage = ({ handleLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const correctEmail = 'user@ex';
  const correctPassword = '123456';
  
  const handleLogin = (e) => {
    e.preventDefault();
     if (email === correctEmail && password === correctPassword ) {
      toast.success('✅ Login successful!');
      handleLoggedIn();
      sessionStorage.setItem(correctEmail,correctPassword);

    } else {
      toast.error('❌ Invalid email or password');
    }
  };

  return (<>
    <form className='formStyle' onSubmit={handleLogin}>
      <h2 className='title'>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='inputStyle'
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='inputStyle'
        required
      />
      <button className='buttonStyle1' type="submit" >
        Login
      </button>
    </form>
    <ToastContainer position="top-center" autoClose={3000} /> 
    </>
  );
};


export default LoginPage;
