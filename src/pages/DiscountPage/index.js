import React from 'react';
import Voucher_Item from '~/components/Voucher_Item';

const list = [
    {
        _id: "6637101f32427247464f8bed",
        name: "123",
        discountId: "ds00000004",
        classify: "sale",
        typeDiscount: false,
        value: 12000,
        apply: 200000,
        status: true,
        note: "",
        startDay: "2024-05-01T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-05-05T04:50:39.658Z",
        updatedAt: "2024-05-05T04:50:39.658Z",
        __v: 0
    },
    {
        _id: "66370feb32427247464f8be6",
        name: "123",
        discountId: "ds00000003",
        classify: "ship",
        typeDiscount: true,
        value: 3,
        apply: 160000,
        status: true,
        note: "123",
        startDay: "2024-04-29T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-05-05T04:49:47.757Z",
        updatedAt: "2024-05-05T04:49:47.757Z",
        __v: 0
    },
    {
        _id: "6630da1c8e8aae4231f85d71",
        name: "234",
        discountId: "ds00000002",
        classify: "pay",
        typeDiscount: true,
        value: 10,
        apply: 200000,
        status: true,
        note: "234",
        startDay: "2024-04-30T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-04-30T11:46:36.632Z",
        updatedAt: "2024-04-30T11:46:36.632Z",
        __v: 0
    },
    {
        _id: "6630d9f58e8aae4231f85d6c",
        name: "123",
        discountId: "ds00000001",
        classify: "ship",
        typeDiscount: true,
        value: 3,
        apply: 150000,
        status: true,
        note: "123",
        startDay: "2024-04-30T00:00:00.000Z",
        endDay: "2024-05-31T00:00:00.000Z",
        createdAt: "2024-04-30T11:45:57.070Z",
        updatedAt: "2024-04-30T11:45:57.070Z",
        __v: 0
    }
]
function DiscountPage() {
    return (
        <div className='m-5 mb-10 p-3 rounded-lg'>
            <div className='mb-4 font-bold text-[18px]'>
                Khuyến mãi hôm nay
                <div className='flex flex-wrap gap-[5%] mt-4 justify-center md:justify-start'>
                    {
                        list.map((item, index) => (
                            <Voucher_Item discount={item} key={index} />
                        ))
                    }
                </div>

            </div>
        </div>
    );
}

export default DiscountPage;