import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { CustomerItem } from '~/components/Item';
const rows = [
    {
        customerId: '123',
        name: 'NTQ',
        phoneNumber: '0328632492',
        isActive: true,
        purchasedOrder: 12,
    },
    {
        customerId: '123',
        name: 'NTQ',
        phoneNumber: '0328632492',
        isActive: true,
        purchasedOrder: 12,
    },
    {
        customerId: '123',
        name: 'NTQ',
        phoneNumber: '0328632492',
        isActive: false,
        purchasedOrder: 12,
    },
    {
        customerId: '123',
        name: 'NTQ',
        phoneNumber: '0328632492',
        isActive: true,
        purchasedOrder: 12,
    },
    {
        customerId: '123',
        name: 'NTQ',
        phoneNumber: '0328632492',
        isActive: false,
        purchasedOrder: 12,
    },
]

const optionsTT = [
    { label: 'Đang hoạt động', value: true },
    { label: 'Bị khóa', value: false },
];
function CustomerList(props) {
    const navigate = useNavigate();

    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [pending, setPending] = useState(false);

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };

    const handleFilter = async () => {

        handleCloseFilter();
    }

    const [selectedTT, setSelectedTT] = useState([]);
    const onRowClicked = useCallback((row) => {
        navigate('/customers/details/' + row.customerId);
    }, []);
    return (
        <div className='container'>
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
                    itemComponent={CustomerItem}
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

export default CustomerList;