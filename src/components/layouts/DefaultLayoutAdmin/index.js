import React from 'react';
import SideBar from './SideBar';
import Header from './Header';


function defaultLayoutAdmin({ children, title, back }) {
    return (
        <div className='flex h-screen'>
            <div className='hidden sm:block min-w-[30vh] transition-all'>
                <SideBar />
            </div>
            <div className='bg-[#e9ecef] flex-1 w-[100%] h-[100vh]'>
                <Header back={back} title={title} />
                <div >{children}</div>
            </div>

        </div>
    );
}

export default defaultLayoutAdmin;