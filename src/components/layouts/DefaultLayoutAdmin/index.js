import React from 'react';
import SideBar from './SideBar';
import Header from './Header';


function defaultLayoutAdmin({ children, title, back }) {
    return (
        <div className='flex flex-row w-screen min-h-[100vh] '>
            <div className='hidden sm:block w-[35vh] transition-all'>
                <SideBar />
            </div>
            <div className='bg-[#e9ecef] w-screen'>
                <Header back={back} title={title} />
                <div >{children}</div>
            </div>

        </div>
    );
}

export default defaultLayoutAdmin;