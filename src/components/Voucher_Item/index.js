import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faCartShopping,
    faMoneyBill
} from '@fortawesome/free-solid-svg-icons';
import ran_out from '../../assets/images/ran_out.png'
const addCommas = (num) => {
    if (num === null) return;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
function Voucher_Item({
    discount,
    addToCart
}) {
    const [colect, setColect] = useState(false)

    const onClick = () => {
        setColect(true)
        addToCart(discount)
    }

    return (
        <div className='w-[100%] md:w-[45%] flex h-[170px] mb-4'>
            {
                discount.classify === 'sale' ? <div className={colect === true ? 'bg-white text-slate-500  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                    'bg-white text-red-600  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'}>
                    <FontAwesomeIcon icon={faCartShopping} className='w-[50%] h-[40%] my-[10px]' />
                    <div className='text-[14px] ssm:text-[18px]'>Sale off</div>
                </div>
                    : discount.classify === 'ship' ? <div className={colect === true ? 'bg-white text-slate-500  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                        'bg-white text-green-600  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'}>

                        <FontAwesomeIcon icon={faTruckFast} className='w-[50%] h-[40%] my-[10px]' />
                        <div className='text-[14px] ssm:text-[18px]'>Shipment</div>
                    </div> :
                        <div className={colect === true ? 'bg-white text-slate-500  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2' :
                            'bg-white text-blue-600  w-[40%] flex flex-col justify-center items-center rounded-xl border-dashed border-e-2'}>

                            <FontAwesomeIcon icon={faMoneyBill} className='w-[50%] h-[40%] my-[10px]' />
                            <div className='text-[14px] ssm:text-[18px]'>Payment</div>
                        </div>
            }

            <div className={
                colect === true ? 'bg-slate-50 text-slate-500 ssm:w-[60%] flex flex-col justify-center items-center rounded-xl' :
                    discount.classify === 'sale' ? 'bg-red-100 text-red-600 ssm:w-[60%] flex flex-col justify-center items-center rounded-xl' :
                        discount.classify === 'ship' ? 'bg-green-100 text-green-600 ssm:w-[60%] flex flex-col justify-center items-center rounded-xl' :
                            'bg-blue-100 text-blue-600 ssm:w-[60%] flex flex-col justify-center items-center rounded-xl'
            } >
                {
                    colect === true ? <img src={ran_out} className='w-[35%]' /> : <div></div>
                }

                {
                    discount.typeDiscount === false ?
                        <div className='md:text-[30px] text-[24px]'><span className='text-[20px]'>đ</span> {addCommas(discount.value)} </div> :
                        <div className='md:text-[30px] text-[24px]'>{addCommas(discount.value)} <span className='text-[20px]'>% OFF</span></div>
                }
                <div className=' font-medium'>
                    Min.spend <span>{addCommas(discount.apply)}đ</span>
                </div>
                {
                    colect === false ? (
                        <button className={discount.classify === 'sale' ? 'bg-gradient-to-r from-amber-500 to-red-500 mt-[15px] py-2 px-2 md:rounded-3xl rounded-xl w-[75%] text-white cursor-pointer '
                            : discount.classify === 'ship' ? 'bg-gradient-to-r from-lime-500 to-green-500 mt-[15px] py-2 px-2 md:rounded-3xl rounded-xl w-[75%] text-white cursor-pointer '
                                : 'bg-gradient-to-r from-cyan-500 to-blue-500 mt-[15px] py-2 px-2 md:rounded-3xl rounded-xl w-[75%] text-white cursor-pointer '
                        } onClick={() => onClick()}>
                            Thu thập
                        </button>
                    ) : (
                        <div>

                        </div>
                    )
                }


            </div>
        </div>
    );
}

export default Voucher_Item;