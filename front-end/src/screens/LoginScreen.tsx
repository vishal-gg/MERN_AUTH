import React, { useState, useEffect } from 'react';
import { signIn } from '../store/features/asynOperation/authSlice';
import { useAppDispatch, useAppSelector } from '../types/storeType';
import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state=>state.auth)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    dispatch(signIn({ email, password }));
  };

  useEffect(()=> {
    userInfo && navigate('/')
  }, [navigate, userInfo])

  return (
    <div>
      <h1>Login Screen</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    
    </div>
  );
};

export default LoginScreen;

