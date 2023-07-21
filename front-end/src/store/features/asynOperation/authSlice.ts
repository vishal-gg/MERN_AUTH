import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { ApiResponse, SignInPayload, StateType, registerPayload } from '../../../types/authType';


const IfUserExists = localStorage.getItem('userInfo')

const initialState: StateType = {
  loading: false,
  userInfo: IfUserExists ? JSON.parse(IfUserExists) : null,
  error: '',
}

export const register = createAsyncThunk(
  'auth/register',
  async ({name, email, password }: registerPayload) => {
    try {
      const {data} = await axios.post<ApiResponse>('https://mern-auth-serverside.vercel.app/api/users', {name, email, password });
      return data;
    } catch (err:any) {
      throw new Error(err.response.data.error)
    }
  }
);
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: SignInPayload) => {
    try {
      const {data} = await axios.post<ApiResponse>('https://mern-auth-serverside.vercel.app/api/users/auth', { email, password });
      return data;
    } catch (err:any) {
      throw new Error(err.response.data.error)
    }
  }
);

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
      try {
        const {data} = await axios.post('https://mern-auth-serverside.vercel.app/api/users/logout');
        return data;
      } catch (err:any) {
        throw new Error(err.response.data.error)
      }
    }
  );

export const deleteAccount = createAsyncThunk(
    'auth/delete-account',
    async (id: string) => {
     try {
       const {data} = await axios.delete(`https://mern-auth-serverside.vercel.app/api/users/${id}`);
       return data;
     } catch (err:any) {
       throw new Error(err.response.data.error)    
     }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = '';
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(signIn.pending, (state) => { 
        state.loading = true;
        state.error = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;    
        state.error = '';
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.userInfo = null;
        state.error = action.error.message || 'Something went wrong';
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.error = '';
        localStorage.removeItem('userInfo');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'logout request failed';
      })
      .addCase(deleteAccount.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(deleteAccount.fulfilled, (state) => {
        state.loading = false;
        state.userInfo = null;
        state.error = '';
        localStorage.removeItem('userInfo');
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'something went wrong'
      })
  },
})

export default authSlice.reducer
