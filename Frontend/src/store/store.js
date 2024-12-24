      import { configureStore } from '@reduxjs/toolkit';
      import userReducer from '../features/User/userSlice.js';
      import postReducer from '../features/Post/postSlice.js';
      import collabReducer from '../features/Collab/collabSlice.js';
      import inviteReducer from '../features/Invite/inviteSlice.js';
      import exchangesReducer from '../features/Exchange/exchangeSlice.js';



      export const store = configureStore({
        reducer: {
          user: userReducer,
            posts: postReducer,
            collab: collabReducer,
            invite: inviteReducer,
            exchanges: exchangesReducer

        },
      });

