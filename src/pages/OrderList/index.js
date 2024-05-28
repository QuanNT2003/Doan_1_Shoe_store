import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { OrderItem } from '~/components/Item';
import DateRange from '~/components/DateRange';
import * as OrderServices from '~/apiServices/orderServices'
import { ToastContext } from '~/components/ToastContext';
const optionsTT = [
    { label: 'Đang tiếp nhận', value: 'receiving' },
    { label: 'Đã nhận', value: 'received' },
    { label: 'Đang giao', value: 'delivering' },
    { label: 'Đã giao', value: 'delivered' },
    { label: 'Đã hủy', value: 'cancelled' },
];

function OrderList() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [day, setDay] = useState(new Date())
    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedCustomer([])
        setSelectedTT([])
    };

    const handleFilter = async () => {
        getList(
            await createObjectQuery(
                page,
                limit,
                sortBy,
                orderBy,
                selectedCustomer,
                selectedTT
            )
        );
        handleCloseFilter();
    }

    const [dateCreated, setDateCreated] = useState('');

    const handleSetDate = (str) => {
        setDateCreated(str);
    }

    const [optionsCustomer, setOptionsUser] = useState([])

    const [selectedCustomer, setSelectedCustomer] = useState([]);
    const [selectedTT, setSelectedTT] = useState([]);

    const onRowClicked = useCallback((row) => {
        navigate('/orders/details/' + row.orderId);
    }, []);

    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        user,
        status,
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(user && { user }),
            ...(status && { status }),
        };
    }
    const getList = async (obj) => {
        setPending(true);

        const response = await OrderServices.getAllOrder(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                    setTotalRows(0);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            setPending(false);
            setRows(response.data);
            setTotalRows(response.total);

        }
    }
    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);

        getList(
            await createObjectQuery(
                pageNumber,
                limit,
                sortBy,
                orderBy,
            )
        );
        setDay(new Date())

    }

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setPage(pageNumber);
        setLimit(newPerPage);

        getList(
            await createObjectQuery(
                pageNumber,
                newPerPage,
                sortBy,
                orderBy,
            )
        );
        setDay(new Date())
        handleClearFilter()
    }
    const getUser = async () => {
        const response = await OrderServices.getUser()
            .catch((error) => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });

        if (response) {
            console.log(response);
            const data = await response.data.map((user) => ({ label: user.name, value: user._id }));
            setOptionsUser(data);
        }
    }
    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    sortBy,
                    orderBy,
                ));
            getUser()
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
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
                    itemComponent={OrderItem}
                    data={rows}
                    pending={pending}


                    // PAGINATION
                    totalRows={totalRows}
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                // SORT
                // handleSort={handleSort}
                />
            </div>

        </div>
    );
}

export default OrderList;