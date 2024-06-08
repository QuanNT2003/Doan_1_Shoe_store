import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { CustomerItem } from '~/components/Item';
import * as UserServices from '~/apiServices/userServices'
import { ToastContext } from '~/components/ToastContext';

const optionsTT = [
    { label: 'Đang hoạt động', value: true },
    { label: 'Bị khóa', value: false },
];
function CustomerList() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);
    const [search, setSearch] = useState('')
    const handleSearch = async () => {
        setPage(1);
        getList(
            await createObjectQuery(
                1,
                limit,
                sortBy,
                orderBy,
                search,
            )
        );
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

    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        name,
        active
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(name && { name }),
            ...(active && { active }),
        };
    }

    const getList = async (obj) => {
        setPending(true);

        const response = await UserServices.getAllusers(obj)
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
            console.log(response);
            setPending(false);
            setRows(response.data);
            setTotalRows(response.total);

        }
    }

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedTT([])
    };

    const handleFilter = async () => {
        setPage(1);
        getList(
            await createObjectQuery(
                1,
                limit,
                sortBy,
                orderBy,
                search,
                selectedTT
            )
        );
        handleCloseFilter();
    }

    const [selectedTT, setSelectedTT] = useState([]);
    const onRowClicked = useCallback((row) => {
        navigate('/customers/details/' + row.userId);
    }, []);

    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);

        getList(
            await createObjectQuery(
                pageNumber,
                limit,
                sortBy,
                orderBy,
                search,
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
                search,
            )
        );
        setDay(new Date())

    }

    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                ));
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
                    setSearch={setSearch}
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

export default CustomerList;