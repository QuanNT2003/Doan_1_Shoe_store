import React from 'react';
import SideBar from './SideBar';
import Header from './Header';


function defaultLayoutAdmin({ children, title, back }) {
    return (
        <div className='flex flex-row w-screen h-screen '>
            <div className='hidden sm:block w-[35vh]  min-w-[25vh]'>
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