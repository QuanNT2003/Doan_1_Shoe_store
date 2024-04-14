import React from 'react';
import Header from './Header';
import Footer from './Footer';

function defaultLayoutClient({ children }) {
    return (
        <div className=' bg-[#e9ecef]'>
            <Header />
            <div className='lg:w-[70%] w-[100%] bg-[#e9ecef] mx-auto' >{children}</div>
            <Footer />

        </div>
    );
}

export default defaultLayoutClient;