      import { configureStore } from '@reduxjs/toolkit';
      import userReducer from '../features/User/userSlice.js';

      export const store = configureStore({
        reducer: {
          user: userReducer,
        },
      });

