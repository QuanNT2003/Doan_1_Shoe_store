import React from 'react';
import Header from './Header';

function defaultLayoutClient({ children }) {
    return (
        <div className='flex h-screen flex-col bg-[#e9ecef]'>
            <Header />
            <div className='md:w-[85%] w-[100%] bg-slate-400 h-svh mx-auto'>{children}</div>
        </div>
    );
}

export default defaultLayoutClient;