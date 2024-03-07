import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { DiscountItem } from '~/components/Item';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
const optionsTT = [
    { label: 'Đang chạy', value: 'running' },
    { label: 'Tạm ngừng', value: 'paused' },
    { label: 'Đã hủy', value: 'stopped' },
];

const optionsLM = [
    { label: 'Mã vận chuyển', value: 'ship' },
    { label: 'Sale off', value: 'sale' },
    { label: 'Giảm gía thanh toán', value: 'pay' },
];

const rows = [
    {
        promotionId: '1',
        name: '123',
        remainQuantity: 12,
        style: 'pay',
        status: 'running',
    },
    {
        promotionId: '2',
        name: '123',
        remainQuantity: 12,
        style: 'ship',
        status: 'running',
    },
    {
        promotionId: '3',
        name: '123',
        remainQuantity: 12,
        style: 'sale',
        status: 'running',
    },
    {
        promotionId: '4',
        name: '123',
        remainQuantity: 12,
        style: 'ship',
        status: 'paused',
    },
]
function PromotionList() {
    const navigate = useNavigate();


    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [pending, setPending] = useState(false);




    const [selectedTT, setSelectedTT] = useState([]);
    const [selectedLM, setSelectedLM] = useState([]);

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };

    const handleFilter = async () => {

        handleCloseFilter();
    };

    const onRowClicked = useCallback((row) => {
        navigate('/promotions/details/' + row.promotionId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div className='container'>
            <div className='frame'>
                <LinkButton path='/promotions/add' placeholder='Thêm khuyến mãi' icon={<FontAwesomeIcon icon={faPlus} className='me-2' />} />
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

                                options={optionsLM}
                                placeholder={'Loại mã'}
                                selected={selectedLM}
                                setSelected={setSelectedLM}
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
                    onRowClicked={onRowClicked}
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