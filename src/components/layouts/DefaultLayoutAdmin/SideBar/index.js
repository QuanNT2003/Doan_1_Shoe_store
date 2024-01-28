import React, { useEffect } from 'react';
import example from '~/assets/example.jpg'
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMessage,
    faGear,
    faPercent,
    faBox,
    faReceipt,
    faChartSimple,
    faUser
} from '@fortawesome/free-solid-svg-icons';


function SideBar() {

    const links = [
        {
            title: 'Sản phẩm',
            path: '/products',
            icon: <FontAwesomeIcon icon={faBox} className='me-4 ' />,

        },
        {
            title: 'Khuyến mãi',
            path: '/',
            icon: <FontAwesomeIcon icon={faPercent} className='me-4 ' />,

        },
        {
            title: 'Đơn hàng',
            path: '/',
            icon: <FontAwesomeIcon icon={faReceipt} className='me-4 ' />,

        },
        {
            title: 'Khách hàng',
            path: '/',
            icon: <FontAwesomeIcon icon={faUser} className='me-4 ' />,

        },
        {
            title: 'Chat với khách hàng',
            path: '/',
            icon: <FontAwesomeIcon icon={faMessage} className='me-4 ' />,

        },
        {
            title: 'Báo cáo thông kê',
            path: '/',
            icon: <FontAwesomeIcon icon={faChartSimple} className='me-4 ' />,

        }

    ]

    const navlink = 'flex h-14 border hover:bg-[#3a57e8] hover:text-white items-center ps-6 transition-all rounded-md mb-1 text-wrap'
    const active = 'flex h-14 border bg-[#3a57e8] text-white items-center ps-6 transition-all rounded-md mb-1 text-wrap'

    const path = useLocation()



    return (
        <div className='w-full h-full'>
            <div className='pt-6 flex justify-center items-center h-20'>
                <img src={example} className='h-full w-1/3 rounded-md me-3' />
                TQStore
            </div>
            <hr className=' mt-4 mx-3' />


            <div className='mt-5 me-2 pe-3 ms-1 text-base'>
                {
                    links.map((e, index) => (
                        <NavLink
                            key={index}
                            to={e.path}
                            className={path.pathname === e.path ? active : navlink}
                        >
                            <div >
                                <div >{e.icon}</div>
                            </div>
                            <div >{e.title}</div>
                        </NavLink>
                    ))
                }
            </div>

        </div>
    );
}

export default SideBar;