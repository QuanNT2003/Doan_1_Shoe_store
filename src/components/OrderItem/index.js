import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruckFast,
    faAngleRight
} from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function OrderItem({
    Item,
    onCLick
}) {
    return (
        <div className='bg-white ssm:m-5 mb-4 p-3 rounded-lg select-none border cursor-pointer' onClick={() => onCLick(Item)}>
            <div className='flex items-center text-[17px] font-medium'> Đơn hàng {
                Item.status === 'receiving' ? 'đang chờ tiếp nhận'
                    : Item.status === 'received' ? 'đã tiếp nhân'
                        : Item.status === 'delivering' ? 'đang giao'
                            : Item.status === 'delivered' ? 'đã giao'
                                : 'đã hủy'
            }</div>
            <div className=' bg-slate-200 flex items-center p-3 my-3 rounded-md justify-between'>
                <div className='flex items-center me-4'>
                    <FontAwesomeIcon icon={faTruckFast} className='ssm:me-10 me-3 ssm:h-[40px] h-[25px]' />
                    <div>
                        <div className='font-semibold ssm:text-[18px] text-[14px]'>{Item.status === 'receiving' ? format(new Date(Item.updatedAt), 'MMM dd') : format(new Date(Item.createdAt), 'MMM dd')}</div>
                        <div className='ssm:text-[15px] text-[12px]'>Kiện hàng {
                            Item.status === 'receiving' ? 'đang chờ tiếp nhận'
                                : Item.status === 'received' ? 'đã tiếp nhân'
                                    : Item.status === 'delivering' ? 'đang giao'
                                        : Item.status === 'delivered' ? 'đã giao'
                                            : 'đã hủy'
                        }</div>
                    </div>
                </div>
                <div>
                    <FontAwesomeIcon icon={faAngleRight} className='ssm:me-10 h-[20px]' />
                </div>

            </div>
            {
                Item.item.map((item, index) => (
                    <div className='flex mt-3 border rounded-md p-1' key={index}>
                        <div className='justify-center md:w-[150px] ssm:w-[35%] min-w-[50px] flex items-center'>
                            <img src={item.product.images[0].url} className='md:w-[120px] md:h-[120px] w-[80px]' />
                        </div>
                        <div className='md:ms-4 mx-1 cursor-pointer md:w-[50%] w-[75%] md:me-3'>
                            <div className='md:text-[17px] text-[13px] font-bold text-wrap mb-3 line-clamp-2 text-ellipsis '>
                                {item.product.name}
                            </div>
                            <div className='text-[13px] md:text-[15px] line-clamp-2 text-ellipsis '>
                                {item.version.color.name}, Size : {item.version.size.name}
                            </div>
                            <div className='mt-3 md:text-[17px] text-[13px] font-semibold md:hidden block'>
                                {addCommas(item.product.price * (100 - item.product.discount) / 100)} đ  x {item.quantity}
                            </div>

                        </div>
                        <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                            Đơn giá : {addCommas(item.product.price * (100 - item.product.discount) / 100)} đ
                        </div>
                        <div className='w-[15%] md:text-[17px] text-[14px] font-semibold hidden md:block'>
                            SL : {item.quantity} sản phẩm
                        </div>

                    </div>
                ))
            }


            <div className='mt-3 flex justify-end me-3 font-semibold'>
                Tổng cộng 5 sản phẩm : {addCommas(Item.payment.total)}đ
            </div>
        </div>
    );
}

export default OrderItem;