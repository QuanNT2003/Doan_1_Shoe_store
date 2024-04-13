import React from 'react';
import Header from './Header';

function defaultLayoutClient({ children }) {
    return (
        <div className='flex h-screen flex-col bg-[#e9ecef]'>
            <Header />
            <div className='lg:w-[70%] w-[100%]h-svh mx-auto'>{children}</div>
        </div>
    );
}

export default defaultLayoutClient;