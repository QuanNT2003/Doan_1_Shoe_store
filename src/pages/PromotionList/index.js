import React, { useState } from 'react';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { DiscountItem } from '~/components/Item/DiscountItem/DiscountItem';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
const optionsHL = [
    { label: 'Còn hiệu lực', value: false },
    { label: 'Hết hiệu lực', value: true },
];

const optionsTT = [
    { label: 'Đang chạy', value: 'running' },
    { label: 'Tạm ngừng', value: 'paused' },
    { label: 'Đã hủy', value: 'stopped' },
];

const rows = [
    {
        promotionId: '1',
        name: '123',
        remainQuantity: 12,
        startAt: '2024-01-31 11:11',
        closeAt: '2024-02-19 12:00',
        status: 'running',
    },
    {
        promotionId: '2',
        name: '123',
        remainQuantity: 12,
        startAt: '2024-01-31 11:11',
        closeAt: '2024-02-19 12:00',
        status: 'running',
    },
    {
        promotionId: '3',
        name: '123',
        remainQuantity: 12,
        startAt: '2024-01-31 11:11',
        closeAt: '2024-02-19 12:00',
        status: 'running',
    },
    {
        promotionId: '4',
        name: '123',
        remainQuantity: 12,
        startAt: '2024-01-31 11:11',
        closeAt: '2024-02-19 12:00',
        status: 'paused',
    },
]
function PromotionList() {
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [pending, setPending] = useState(false);



    const [selectedHL, setSelectedHL] = useState([]);
    const [selectedTT, setSelectedTT] = useState([]);

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };

    const handleFilter = async () => {

        handleCloseFilter();
    };
    return (
        <div className='text-3xl font-bold w-full'>
            <div className='frame'>
                <LinkButton path='/adddiscount' placeholder='Thêm khuyến mãi' icon={<FontAwesomeIcon icon={faPlus} className='me-2' />} />
            </div>
            <div className='frame'>
                <List
                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên khuyến mãi'}
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

                                options={optionsHL}
                                placeholder={'Hiệu lực thời gian'}
                                selected={selectedHL}
                                setSelected={setSelectedHL}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp

                                options={optionsTT}
                                placeholder={'Tình trạng'}
                                selected={selectedTT}
                                setSelected={setSelectedTT}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }
                    // TABLE
                    pagination
                    // onRowClicked={onRowClicked}
                    itemComponent={DiscountItem}
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

export default PromotionList;