import React from 'react'
import Header from './Header.jsx'
import Sidebar from '../Layout/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <div className='fixed top-18 left-0 w-full h-full flex bg-gray-300'>
                <Sidebar />
                <div className='p-5 w-full h-full overflow-y-scroll'>
                    <div className='p-5 border border-gray-400 rounded-lg w-full'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard