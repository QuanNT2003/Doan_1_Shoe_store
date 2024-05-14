import React from 'react';
import Header from './Header';
import Footer from './Footer';
import bg from '~/assets/images/bg_muahe.jpg'
function defaultLayoutClient({ children }) {
    return (
        <div className=' bg-[#e9ecef] bg-no-repeat bg-cover bg-fixed' style={{
            backgroundImage: `url('${bg}')`
        }}>
            <Header />
            <div className='lg:w-[75%] w-[100%] bg-[#e9ecef] mx-auto my-0'>
                {/* <UtilityBar /> */}
                {children}
            </div>
            <Footer />

        </div>
    );
}

export default defaultLayoutClient;