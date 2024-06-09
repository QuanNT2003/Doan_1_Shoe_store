import React, { useEffect } from 'react';
import example from '~/assets/images/logo.png'
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMessage,
    faStore,
    faPercent,
    faBox,
    faReceipt,
    faChartSimple,
    faUser,
    faRightLeft,
    faWarehouse,
    faComment
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
            path: '/promotions',
            icon: <FontAwesomeIcon icon={faPercent} className='me-4 ' />,

        },
        {
            title: 'Đơn hàng',
            path: '/orders',
            icon: <FontAwesomeIcon icon={faReceipt} className='me-4 ' />,

        },
        {
            title: 'Đổi - Trả hàng',
            path: '/exchange_returns',
            icon: <FontAwesomeIcon icon={faRightLeft} className='me-4 ' />,

        },
        {
            title: 'Nhập hàng',
            path: '/imports',
            icon: <FontAwesomeIcon icon={faWarehouse} className='me-4 ' />,

        },
        {
            title: 'Khách hàng',
            path: '/customers',
            icon: <FontAwesomeIcon icon={faUser} className='me-4 ' />,

        },
        {
            title: 'Thương hiệu',
            path: '/brands',
            icon: <FontAwesomeIcon icon={faStore} className='me-4 ' />,

        },
        {
            title: 'Bình luận',
            path: '/comments',
            icon: <FontAwesomeIcon icon={faComment} className='me-4 ' />,

        },
        {
            title: 'Báo cáo thông kê',
            path: '/reports',
            icon: <FontAwesomeIcon icon={faChartSimple} className='me-4 ' />,

        }

    ]

    return (
        <div className='w-full h-full'>
            <div className='pt-6 flex justify-center items-center h-28'>
                <img src={example} className='h-full w-1/3 rounded-md me-3' />
                TQShop
            </div>
            <hr className=' mt-4 mx-3' />


            <div className='mt-5 me-2 pe-3 ms-2 text-base'>
                {
                    links.map((e, index) => (
                        <NavLink
                            key={index}
                            to={e.path}
                            className={({ isActive }) =>
                                isActive ? 'active navlink' : 'navlink'
                            }
                        >
                            <div >
                                {e.icon}
                            </div>
                            <div className='pe-2'>{e.title}</div>
                        </NavLink>
                    ))
                }
            </div>

        </div>
    );
}

export default SideBar;