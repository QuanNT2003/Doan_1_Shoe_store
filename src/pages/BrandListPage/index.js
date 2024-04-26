import React, { useState } from 'react';
import Brand_WC_Item from '~/components/Brand_WC_Item';
import MultiSelectComp from '~/components/MultiSelectComp';
import SearchBar from '~/components/SearchBar';
const optionsSL = [
    { label: '0 - 30', value: '0-30' },
    { label: '30 - 70', value: '30-70' },
    { label: '70 - 100', value: '70-100' },
    { label: '100 - Trở lên', value: '100-500' },
];
const brands = [
    {
        brandId: 'SP001',
        images: [
            'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/426571080_1792048851310816_3127445872686098501_n.jpg?stp=c4.0.320.320a_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeF_O5dUR3hggeTQC4elh9BpKpda0SuVut4ql1rRK5W63q_d94FqKsQ3gCpk2OGaz7u-1xTsr65bfU8lhl3E2bo2&_nc_ohc=LaSPX4gBZA4AX-odx-Y&_nc_ht=scontent.fhan4-3.fna&oh=00_AfA_TZZxSCg8GaRj2Digu-EMrpq3hYEyj96MeFENslOadg&oe=65E8A4D2'
        ],
        name: 'Mot hai ba',
        nation: 'Việt Nam',
        totalProduct: 20,
        email: '123@gmail.com',
        website: 'www.123.com'

    },
    {
        brandId: 'SP002',
        images: [
            'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/426571080_1792048851310816_3127445872686098501_n.jpg?stp=c4.0.320.320a_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeF_O5dUR3hggeTQC4elh9BpKpda0SuVut4ql1rRK5W63q_d94FqKsQ3gCpk2OGaz7u-1xTsr65bfU8lhl3E2bo2&_nc_ohc=LaSPX4gBZA4AX-odx-Y&_nc_ht=scontent.fhan4-3.fna&oh=00_AfA_TZZxSCg8GaRj2Digu-EMrpq3hYEyj96MeFENslOadg&oe=65E8A4D2'
        ],
        name: 'Mot hai ba',
        nation: 'Việt Nam',
        totalProduct: 20,
        email: '123@gmail.com',
        website: 'www.123.com'

    },
    {
        brandId: 'SP003',
        images: [
            'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/426571080_1792048851310816_3127445872686098501_n.jpg?stp=c4.0.320.320a_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeF_O5dUR3hggeTQC4elh9BpKpda0SuVut4ql1rRK5W63q_d94FqKsQ3gCpk2OGaz7u-1xTsr65bfU8lhl3E2bo2&_nc_ohc=LaSPX4gBZA4AX-odx-Y&_nc_ht=scontent.fhan4-3.fna&oh=00_AfA_TZZxSCg8GaRj2Digu-EMrpq3hYEyj96MeFENslOadg&oe=65E8A4D2'
        ],
        name: 'Mot hai ba',
        nation: 'Việt Nam',
        totalProduct: 20,
        email: '123@gmail.com',
        website: 'www.123.com'

    },
]
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
                    <div className=' lg:flex'>
                        <div className='mx-4 w-[250px] my-3'>
                            <MultiSelectComp
                                options={optionsSL}
                                placeholder={'Số lượng sản phẩm'}
                                selected={selectedSL}
                                setSelected={setSelectedSL}
                                hasSelectAll={true}
                            />
                        </div>
                        <div className='mx-4 w-[250px] my-3'>
                            <MultiSelectComp

                                options={optionsNation}
                                placeholder={'Quốc gia'}
                                selected={selectedNation}
                                setSelected={setSelectedNation}
                                hasSelectAll={true}
                            />
                        </div>
                        <div className='mx-4 ssm:w-[400px] w-[250px] my-3 lg:w-[600px] flex items-center'>
                            <SearchBar placeholder={'Tim kiếm thương hiệu'} />
                        </div>
                    </div>


                </div>

                <div>
                    {
                        brands.map((item, index) => (
                            <div key={index}>
                                <Brand_WC_Item brand={item} />

                            </div>
                        ))
                    }


                </div>
                <div className='flex justify-center items-center pb-5'>
                    <button className='bg-blue-500 mx-auto p-3 rounded-lg w-[30%] text-white hover:bg-blue-400 cursor-pointer ' >
                        Xem Thêm
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BrandListPage;