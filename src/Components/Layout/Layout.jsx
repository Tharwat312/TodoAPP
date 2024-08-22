import React from 'react'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
const Layout = () => {
    return (
        <>
            <Navbar />
            <section className="relative container mx-auto main-height flex items-center justify-center bg-gray-300 dark:bg-[#171717] rounded">
                <Outlet />
            </section>
            <Footer />
        </>
    )
}

export default Layout;
