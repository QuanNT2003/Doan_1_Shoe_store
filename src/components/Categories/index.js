import React from 'react';
import noImage from '~/assets/images/no-image.png';
function Categories({ list }) {
    return (
        <div className=' m-5 mb-10 p-3 rounded-lg bg-white'>
            <div className='mb-4'>
                Danh mục sản phẩm
            </div>
            <div className='flex lg:flex-wrap overflow-y-auto'>
                {
                    list.map((item, index) => (
                        <div key={index} className='min-h-[90px] min-w-[90px] ssm:min-h-[130px] ssm:min-w-[130px] max-w-[130px] m-2 items-center rounded-lg bg-white hover:shadow-xl cursor-pointer border'>
                            <div className='flex justify-center items-center my-3'>
                                <img src={item.images} className='ssm:w-[90px] ssm:h-[90px] h-[60px] w-[60px] ' />
                            </div>

                            <div className='mb-3 flex justify-center items-center flex-wrap p-2 ssm:text-[14px] text-[11px]'>
                                {item.name}
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Categories;