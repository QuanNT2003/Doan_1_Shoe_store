import React, { useState } from 'react';
import Product_WC_item from '../Product_WC_Item';
import Pagination from '@mui/material/Pagination';
import MultiSelectComp from '~/components/MultiSelectComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faSort,
    faFilter
} from '@fortawesome/free-solid-svg-icons';
const optionsGia = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const optionsLSP = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const optionsPL = [
    { label: '0 - 150.00đ', value: '0 - 150.000đ' },
    { label: '150.000đ - 500.000đ', value: '150.000đ - 500.000đ' },
    { label: '500.000đ - 1.000.000đ', value: '500.000đ - 1.000.000đ' },
    { label: '1.000.000đ - 2.000.000đ', value: '1.000.000đ - 2.000.000đđ' },
    { label: '2.000.000đ trở lên', value: '2.000.000đđ' },
];
const optionsDG = [
    { label: '1 sao', value: '1' },
    { label: '2 sao', value: '2' },
    { label: '3 sao', value: '3' },
    { label: '4 sao', value: '4' },
    { label: '5 sao', value: '5' },
];
const sortlist = [
    {
        name: 'Đánh giá từ thấp tới cao',
    },
    {
        name: 'Đánh giá từ cao tới thấp',
    },
    {
        name: 'Giá từ cao tới thấp',
    },
    {
        name: 'Giá từ thấp tới cao',
    },
    {
        name: 'Lượt đánh giá',
    },
]
function ProductList({
    list
}) {


    //Filter
    const [selectedGia, setSelectedGia] = useState([]);
    const [selectedLSP, setSelectedLSP] = useState([]);
    const [selectedPL, setSelectedPL] = useState([]);
    const [selectedDG, setSelectedDG] = useState([]);
    const [sort, setSort] = useState('Không có')

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return (
        <div>
            <div className='m-3'>
                <div className='font-bold'>
                    Chọn tiêu chí lọc
                </div>
                <div className='flex flex-wrap mt-3'>
                    <div className='w-[250px] me-3'>
                        <MultiSelectComp
                            options={optionsGia}
                            placeholder={'Giá cả'}
                            selected={selectedGia}
                            setSelected={setSelectedGia}
                            hasSelectAll={true}
                            notShowTitle={true}
                        />
                    </div>
                    <div className='w-[250px] me-3'>
                        <MultiSelectComp
                            options={optionsLSP}
                            placeholder={'Loại sản phẩm'}
                            selected={selectedLSP}
                            setSelected={setSelectedLSP}
                            hasSelectAll={true}
                            notShowTitle={true}
                        />
                    </div>
                    <div className='w-[250px] me-3'>
                        <MultiSelectComp
                            options={optionsPL}
                            placeholder={'Phân loại'}
                            selected={selectedPL}
                            setSelected={setSelectedPL}
                            hasSelectAll={true}
                            notShowTitle={true}
                        />
                    </div>
                    <div className='w-[250px] me-3'>
                        <MultiSelectComp
                            options={optionsDG}
                            placeholder={'Đánh giá'}
                            selected={selectedDG}
                            setSelected={setSelectedDG}
                            hasSelectAll={true}
                            notShowTitle={true}
                        />
                    </div>
                </div>

            </div>
            <div className='m-3'>
                <div className='ms-2 cursor-pointer flex items-center group relative'>
                    <div className='me-4 flex items-center justify-center'>
                        <div className='font-bold me-3'> Sắp xếp</div>

                        <FontAwesomeIcon icon={faFilter} className='h-[20px] w-[20px] me-4 text-gray-500' />

                        <div>:</div>
                    </div>
                    <div>{sort}</div>
                    <div className='scale-y-0 absolute group-hover:scale-y-100 group-hover:block transition-all mt-2 duration-300 inset-y-7 z-50'>
                        <div className='min-w-[250px] min-h-[100px] bg-white rounded-md rounded-tr-[0] border shadow'>
                            {sortlist.map((item, index) => (
                                <div key={index} className='h-[40px] flex items-center hover:bg-gray-200 w-[100%] ps-2 transition-all' onClick={(e) => setSort(item.name)}>{item.name}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <hr className='mt-5' />
            <div className='flex flex-wrap mb-7 ms-5'>
                {
                    list.map((item, index) => (
                        <div key={index}>
                            <Product_WC_item product={item} />

                        </div>
                    ))
                }
            </div>
            <div className='flex justify-end pb-4 me-4'>
                <Pagination count={10} color="primary" onChange={handleChange} />
            </div>
        </div>
    );
}

export default ProductList;