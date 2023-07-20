// import React, { useState, useEffect } from 'react';
// import { signIn } from '../store/features/asynOperation/authSlice';
// import { useAppDispatch, useAppSelector } from '../types/storeType';
// import { useNavigate } from 'react-router-dom';

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useAppDispatch();
//   const {userInfo} = useAppSelector(state=>state.auth)
//   const navigate = useNavigate()

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!email || !password) {
//       return;
//     }
//     dispatch(signIn({ email, password }));
//   };

//   useEffect(()=> {
//     userInfo && navigate('/')
//   }, [navigate, userInfo])

//   return (
//     <div>
//       <h1>Login Screen</h1>
//       <form onSubmit={handleSubmit}>
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
//         <button type="submit">Login</button>
//       </form>
    
//     </div>
//   );
// };

// export default LoginScreen;

//                             --- styled by ChatGpt ----

import React, { useState, useEffect } from 'react';
import { signIn } from '../store/features/asynOperation/authSlice';
import { useAppDispatch, useAppSelector } from '../types/storeType';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const { userInfo, error, loading } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    dispatch(signIn({ email, password }));
  };

  useEffect(() => {
    loading ? toast.loading('Loading..') : toast.dismiss()
    error && toast.error(error)
    userInfo && navigate('/');
    return () => toast.dismiss()
  }, [navigate, userInfo, loading, error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Screen</h1>
        <form onSubmit={handleSubmit}>
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
          <button
          disabled={loading}
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${loading && 'opacity-50'}`}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
