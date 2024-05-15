import React from 'react';
import OrderItem from '~/components/OrderItem';
import { data } from './data';
function OrderCollection() {
    return (
        <div className='m-5 mb-10 p-3 rounded-lg bg-white'>
            <div className='font-bold text-[18px]'>Danh sách đơn hàng</div>
            {
                data.map((item, index) => (
                    <div key={index}>
                        <OrderItem Item={item} />
                    </div>
                ))
            }
        </div>
    );
}

export default OrderCollection;