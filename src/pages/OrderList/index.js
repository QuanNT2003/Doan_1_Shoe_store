import React, { useState } from 'react';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { OrderItem } from '~/components/Item';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import DateRange from '~/components/DateRange';

const rows = [
    {
        salesOrderId: '1',
        customerName: '123',
        createdAt: '2024-01-31 11:11',
        totalAmount: 120000,
        status: 'delivering'
    },
    {
        salesOrderId: '2',
        customerName: '123',
        createdAt: '2024-01-31 11:11',
        totalAmount: 120000,
        status: 'receiving'
    },
    {
        salesOrderId: '3',
        customerName: '123',
        createdAt: '2024-01-31 11:11',
        totalAmount: 120000,
        status: 'delivered'
    },
    {
        salesOrderId: '4',
        customerName: '123',
        createdAt: '2024-01-31 11:11',
        totalAmount: 120000,
        status: 'cancelled'
    },
]

const optionsCustomer = [

]

function OrderList(props) {
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

    const [dateCreated, setDateCreated] = useState('');

    const handleSetDate = (str) => {
        setDateCreated(str);
    }

    const [selectedCustomer, setSelectedCustomer] = useState([]);
    return (
        <div className='text-3xl font-bold w-full'>
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
                            <DateRange
                                title={'Ngày tạo'}
                                dateString={dateCreated}
                                setDateString={handleSetDate}
                                bottom
                            />
                            <MultiSelectComp
                                options={optionsCustomer}
                                placeholder={'Khách hàng'}
                                selected={selectedCustomer}
                                setSelected={setSelectedCustomer}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }
                    // TABLE
                    pagination
                    // onRowClicked={onRowClicked}
                    itemComponent={OrderItem}
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

export default OrderList;