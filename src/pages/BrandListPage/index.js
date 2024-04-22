import React, { useState } from 'react';
import Brand_WC_Item from '~/components/Brand_WC_Item';
import MultiSelectComp from '~/components/MultiSelectComp';
const optionsSL = [
    { label: '0 - 30', value: '0-30' },
    { label: '30 - 70', value: '30-70' },
    { label: '70 - 100', value: '70-100' },
    { label: '100 - Trở lên', value: '100-500' },
];

function BrandListPage() {

    const [optionsNation, setOptionsNation] = useState([]);

    //Filter
    const [selectedSL, setSelectedSL] = useState([]);
    const [selectedNation, setSelectedNation] = useState([]);
    return (
        <div>
            <div className='bg-white m-4 mb-10 rounded-lg '>
                <div className='font-bold p-3 pb-1 text-[18px] mb-3'>
                    Danh sách thương hiệu
                </div>
                <div className='bg-white p-3 border'>
                    <div className=' flex'>
                        <div className='mx-4 w-[250px]'>
                            <MultiSelectComp
                                options={optionsSL}
                                placeholder={'Số lượng sản phẩm'}
                                selected={selectedSL}
                                setSelected={setSelectedSL}
                                hasSelectAll={true}
                            />
                        </div>
                        <div className='mx-4 w-[250px]'>
                            <MultiSelectComp

                                options={optionsNation}
                                placeholder={'Quốc gia'}
                                selected={selectedNation}
                                setSelected={setSelectedNation}
                                hasSelectAll={true}
                            />
                        </div>
                    </div>


                </div>

                <div>
                    <Brand_WC_Item />
                    <Brand_WC_Item />
                </div>
                <div className='flex justify-center items-center'>
                    <button className='bg-blue-500 mx-auto p-3 rounded-lg w-[30%] text-white hover:bg-blue-400 cursor-pointer ' >
                        Xem Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandListPage;