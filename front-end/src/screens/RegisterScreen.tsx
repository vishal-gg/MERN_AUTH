// import React, { useState, useEffect } from 'react';
// import { register } from '../store/features/asynOperation/authSlice';
// import { useAppDispatch, useAppSelector } from '../types/storeType';
// import { useNavigate } from 'react-router-dom';

// const RegisterScreen = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const dispatch = useAppDispatch();
//   const {userInfo} = useAppSelector(state=>state.auth)
//   const navigate = useNavigate()

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!name || !email || !password || !confirmPassword) {
//       return;
//     } else if (password !== confirmPassword) {
//       return alert('password do not match')
//     } else {
//         dispatch(register({name, email, password }));
//     }
//   };

//   useEffect(()=> {
//     userInfo && navigate('/')
//   }, [navigate, userInfo])

//   return (
//     <div>
//       <h1>Register Screen</h1>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Enter password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="confirm password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//         />
//         <button type="submit">Register</button>
//       </form>
    
//     </div>
//   );
// };

// export default RegisterScreen;

//                                     --- styled by ChatGpt ---

import React, { useState, useEffect } from 'react';
import { register } from '../store/features/asynOperation/authSlice';
import { useAppDispatch, useAppSelector } from '../types/storeType';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useAppDispatch();
  const { userInfo, loading, error } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return;
    } else if (password !== confirmPassword) {
      return toast.error('passwords do not match');
    } else {
      const res = await dispatch(register({ name, email, password }));
      console.log(res)
    }
  };

  useEffect(() => {
    loading ? toast.loading('loading..') : toast.dismiss()
    error && toast.error(error)
    userInfo && navigate('/');
    return () => toast.dismiss()
  }, [navigate, userInfo, loading, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-600">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Register Screen</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-400"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterScreen;
