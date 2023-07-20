import React, { useState, useEffect } from 'react';
import { register } from '../store/features/asynOperation/authSlice';
import { useAppDispatch, useAppSelector } from '../types/storeType';
import { useNavigate } from 'react-router-dom';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state=>state.auth)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return;
    } else if (password !== confirmPassword) {
      return alert('password do not match')
    } else {
        dispatch(register({name, email, password }));
    }
  };

  useEffect(()=> {
    userInfo && navigate('/')
  }, [navigate, userInfo])

  return (
    <div>
      <h1>Register Screen</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    
    </div>
  );
};

export default RegisterScreen;