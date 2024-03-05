import React, { useState } from 'react';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { BrandItem } from '~/components/Item';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
const rows = [
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

const optionsSL = [
    { label: '0 - 15', value: '0-15' },
    { label: '15 - 30', value: '15-30' },
    { label: '30 - 50', value: '30-50' },
    { label: '50 - 70', value: '50-700' },
    { label: '70 - Trở lên', value: '70-500' },
];

const optionsNation = [

];
function BrandList() {
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [pending, setPending] = useState(false);

    // Filter Options
    const [optionsNation, setOptionsNation] = useState([]);


    //Filter
    const [selectedSL, setSelectedSL] = useState([]);
    const [selectedNation, setSelectedNation] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };

    const handleFilter = async () => {

        handleCloseFilter();
    };
    return (
        <div className='container'>
            <div className='frame'>
                <LinkButton path='/brand/add' placeholder='Thêm thương hiệu' icon={<FontAwesomeIcon icon={faPlus} className='me-2' />} />
            </div>
            <div className='frame'>
                <List
                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên thương hiệu '}
                    search={search}
                    handleSearch={handleSearch}
                    // handleKeyDown={handleKeyDown}
                    filterComponent={
                        <Filter
                            open={openFilter}
                            handleClose={handleCloseFilter}
                            handleOpen={handleOpenFilter}
                            handleClearFilter={handleClearFilter}
                            handleFilter={handleFilter}
                        >
                            <MultiSelectComp

                                options={optionsSL}
                                placeholder={'Số lượng sản phẩm'}
                                selected={selectedSL}
                                setSelected={setSelectedSL}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp

                                options={optionsNation}
                                placeholder={'Quốc gia'}
                                selected={selectedNation}
                                setSelected={setSelectedNation}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }
                    // TABLE
                    pagination
                    // onRowClicked={onRowClicked}
                    itemComponent={BrandItem}
                    data={rows}
                    pending={pending}


                    // PAGINATION
                    totalRows={12}
                // handlePerRowsChange={handlePerRowsChange}
                // handlePageChange={handlePageChange}
                // SORT
                // handleSort={handleSort}
                />
            </div>
        </div>
    );
}

export default BrandList;