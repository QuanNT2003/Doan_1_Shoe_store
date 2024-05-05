import React from 'react';
import Header from './Header';
import Footer from './Footer';
import UtilityBar from '~/components/UtilityBar';

function defaultLayoutClient({ children }) {
    return (
        <div className=' bg-[#e9ecef]'>
            <Header />
            <div className='lg:w-[75%] w-[100%] bg-[#e9ecef] mx-auto' >
                {/* <UtilityBar /> */}
                {children}
            </div>
            <Footer />

        </div>
    );
}

export default defaultLayoutClient;