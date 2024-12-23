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
import Mentorship from "./Pages/Mentorship.jsx";
import ExpertiseExchange from "./Pages/ExpertiseExchange.jsx";
import Settings from "./Pages/Settings.jsx";
import Profile from "./Pages/Profile.jsx";

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
                        <Route path="collaboration" element={<Collaboration />} />
                        <Route path="mentorship" element={<Mentorship />} />
                        <Route path="expertise-exchange" element={<ExpertiseExchange />} />
                        <Route path="settings" element={<Settings />} />
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
