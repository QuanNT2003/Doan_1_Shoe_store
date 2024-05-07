import React from 'react';
import OrderItem from '~/components/OrderItem';

function OrderCollection() {
    return (
        <div className='m-5 mb-10 p-3 rounded-lg bg-white'>
            <div className='font-bold text-[18px]'>Danh sách đơn hàng</div>
            <OrderItem />
            <OrderItem />
            <OrderItem />
        </div>
    );
}

export default OrderCollection;