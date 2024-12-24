import './App.css';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Signup from './Components/Authentication/Signup';
import Login from './Components/Authentication/Login';
import Dashboard from './Components/Layout/Dashboard.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';

import { ToastContainer } from 'react-toastify';
import Home from "./Pages/Home.jsx";
import Collaboration from "./Pages/Collaboration.jsx";
import ExpertiseExchange from "./Pages/ExpertiseExchange.jsx";
import Settings from "./Pages/Settings.jsx";
import Profile from "./Pages/Profile.jsx";
import CreateProposal from './Pages/CreateProposal.jsx';
import CreatePost from './Pages/CreatePost.jsx';
import TeamDetail from "./Pages/TeamDetail.jsx";
import UpdateDetails from "./Pages/UpdateDetails.jsx";
import Requests from "./Pages/Requests.jsx";


function App() {
    return (
        <>
            <div>
                <Routes>
                    {/* Top-Level Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    >
                        <Route index element={<Home />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="team/:teamId" element={<TeamDetail />} />
                        <Route path="collaboration" element={<Collaboration />} />
                        <Route path='create-proposal' element={<CreateProposal />} />
                        <Route path="create-post" element={<CreatePost />} />
                        <Route path="requests" element={<Requests />} />
                        <Route path="expertise-exchange" element={<ExpertiseExchange />} />
                        <Route path="update-details" element={<UpdateDetails />} />
                    </Route>
                </Routes>

                {/* Toast Notifications */}
                <div className="w-0 h-0">
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default App;
