import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHouseUser,
    faTags,
    faPercent,
    faTruckMoving,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
function UtilityBar() {
    return (
        <div className='bg-white m-5 mb-10 p-3 rounded-lg'>
            <div className='mb-4'>
                Tiện ích cho bạn
            </div>
            <div className='flex overflow-y-hidden'>
                <div className='ssm:min-w-[110px] ssm:min-h-[110px] min-w-[80px] min-h-[80px] bg-blue-50 rounded-xl cursor-pointer select-none me-4 hover:scale-110 transition-all'>
                    <div className='ssm:h-[80px] h-[50px] flex justify-center items-center'>
                        <FontAwesomeIcon icon={faHouseUser} className=' text-blue-400 ssm:w-[50px] ssm:h-[50px] w-[30px] h-[30px]' />
                    </div>
                    <div className='flex justify-center items-center ssm:text-[14px] text-[12px]'>
                        Trang chủ
                    </div>
                </div>
                <div className='ssm:min-w-[110px] ssm:min-h-[110px] min-w-[80px] min-h-[80px] bg-green-50 rounded-xl cursor-pointer select-none me-4 hover:scale-110 transition-all'>
                    <div className='ssm:h-[80px] h-[50px] flex justify-center items-center'>
                        <FontAwesomeIcon icon={faTags} className=' text-green-400 ssm:w-[50px] ssm:h-[50px] w-[30px] h-[30px]' />
                    </div>
                    <div className='flex justify-center items-center ssm:text-[14px] text-[12px]'>
                        Thương hiệu
                    </div>
                </div>
                <div className='ssm:min-w-[110px] ssm:min-h-[110px] min-w-[80px] min-h-[80px] bg-red-50 rounded-xl cursor-pointer select-none me-4 hover:scale-110 transition-all'>
                    <div className='ssm:h-[80px] h-[50px] flex justify-center items-center'>
                        <FontAwesomeIcon icon={faPercent} className=' text-red-400 ssm:w-[50px] ssm:h-[50px] w-[30px] h-[30px]' />
                    </div>
                    <div className='flex justify-center items-center ssm:text-[14px] text-[12px]'>
                        Khuyến mãi
                    </div>
                </div>
                <div className='ssm:min-w-[110px] ssm:min-h-[110px] min-w-[80px] min-h-[80px] bg-amber-50 rounded-xl cursor-pointer select-none me-4 hover:scale-110 transition-all'>
                    <div className='ssm:h-[80px] h-[50px] flex justify-center items-center'>
                        <FontAwesomeIcon icon={faCartShopping} className=' text-amber-400 ssm:w-[50px] ssm:h-[50px] w-[30px] h-[30px]' />
                    </div>
                    <div className='flex justify-center items-center ssm:text-[14px] text-[12px]'>
                        Giỏ hàng
                    </div>
                </div>
                <div className='ssm:min-w-[110px] ssm:min-h-[110px] min-w-[80px] min-h-[80px] bg-orange-50 rounded-xl cursor-pointer select-none me-4 hover:scale-110 transition-all'>
                    <div className='ssm:h-[80px] h-[50px] flex justify-center items-center'>
                        <FontAwesomeIcon icon={faTruckMoving} className=' text-orange-400 ssm:w-[50px] ssm:h-[50px] w-[30px] h-[30px]' />
                    </div>
                    <div className='flex justify-center items-center ssm:text-[14px] text-[12px]'>
                        Đơn hàng
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UtilityBar;