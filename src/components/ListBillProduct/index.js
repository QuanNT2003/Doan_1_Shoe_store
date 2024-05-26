import React from 'react';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function ListBillProduct({ list }) {
    return (
        <div className='overflow-scroll'>
            <div className='h-[45px] w-[100vh] min-w-[100%] bg-[#f3f4f5] border-y-[1px] border-solid border-[#cdcdcd] mt-[10px] flex p-4'>
                <div className='flex justify-center items-center text-[14px] font-medium w-[8%] min-w-[42px]'>STT</div>
                <div className='flex justify-center items-center text-[14px] font-medium w-[8%] min-w-[42px]'>Ảnh</div>
                <div className='flex justify-center flex-col text-[14px] font-medium w-[28%] min-w-[120px] ms-2'>Tên sản phẩm</div>
                <div className='flex justify-right items-center text-[14px] font-medium w-[8%] min-w-[80px]'>Số lượng</div>
                <div className='flex justify-right items-center text-[14px] font-medium w-[15%] min-w-[80px]'>Mẫu mã</div>
                <div className='flex justify-right items-center text-[14px] font-medium w-[11%] min-w-[80px]'>Đơn giá</div>
                <div className='flex justify-center items-center text-[14px] font-medium w-[7%] min-w-[80px]'>Giảm giá sản phẩm</div>
                <div className='flex items-center justify-center text-[14px] font-medium w-[15%] min-w-[88px]'>Thành tiền</div>
            </div>
            <div className='max-h-[500px] w-[100vh] min-w-[100%] flex flex-col'>
                {list.map((item, index) => (
                    <div className='h-[80px] min-h-[80px] w-[100vh] min-w-[100%] flex text-[13px] border-b-[1px] border-solid border-[#0909090a] hover:bg-[#f3f4f5] hover:cursor-pointer' key={index}>
                        <div className='flex justify-center items-center text-[14px] font-medium w-[8%] min-w-[42px]'>{index + 1}</div>
                        <div className='flex justify-center items-center text-[14px] font-medium w-[8%] min-w-[42px]'>
                            <img src={item.product.images[0].url} className='h-[40px] w-[40px]' alt="" />
                        </div>
                        <div className='flex justify-center flex-col text-[14px] font-medium w-[28%] min-w-[120px] ms-2'>
                            <div className='text-[14px]'>{item.product.name}</div>
                            <div className='text-[14px]'>{item.product.productId}</div>
                        </div>
                        <div className='flex justify-right items-center text-[14px] font-medium w-[8%] min-w-[80px]'>{item.quantity}</div>
                        <div className='flex justify-right items-center text-[14px] font-medium w-[15%] min-w-[80px]'>{item.version.color.name} - {item.version.size.name}</div>
                        <div className='flex justify-right items-center text-[14px] font-medium w-[11%] min-w-[80px]'>
                            {addCommas(item.product.price)}
                        </div>
                        <div className='flex justify-center items-center text-[14px] font-medium w-[7%] min-w-[80px]'>
                            {item.product.discount} %
                        </div>
                        <div className='flex items-center justify-center text-[14px] font-medium w-[15%] min-w-[88px]'>
                            {addCommas(item.total)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListBillProduct;
