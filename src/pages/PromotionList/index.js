import React, { useState, useCallback, useContext, useEffect } from 'react';
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
import * as PromotionServices from '~/apiServices/promotionServices';
import { ToastContext } from '~/components/ToastContext';

const optionsTT = [
    { label: 'Đang chạy', value: true },
    { label: 'Đã hủy', value: false },
];

const optionsLM = [
    { label: 'Mã vận chuyển', value: 'ship' },
    { label: 'Sale off', value: 'sale' },
    { label: 'Giảm gía thanh toán', value: 'pay' },
];


function PromotionList() {
    const navigate = useNavigate();
    const toastContext = useContext(ToastContext);

    // API PROPS
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(12);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [date, setDate] = useState(new Date())

    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        search,
        classify,
        status
    ) => {

        return {
            page,
            limit,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(search && { search }),
            ...(classify && { classify }),
            ...(status && { status }),
        };
    }
    const [search, setSearch] = useState('')
    const handleSearch = async () => {
        if (selectedLM.length === 0 && selectedTT.length === 0) {
            getList(
                await createObjectQuery(
                    1,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                )
            );
        }
        else {
            getList(
                await createObjectQuery(
                    1,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                    selectedLM.length === 0 ? optionsLM : selectedLM,
                    selectedTT.length === 0 ? optionsTT : selectedTT
                )
            );
        }


        handleCloseFilter();

    };

    //table
    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);
    const [showSubHeader, setShowSubHeader] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);


    //fliter
    const [selectedTT, setSelectedTT] = useState([]);
    const [selectedLM, setSelectedLM] = useState([]);

    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedTT([])
        setSelectedLM([])
    };

    const handleFilter = async () => {
        setPage(1);
        if (selectedLM.length === 0 && selectedTT.length === 0) {
            getList(
                await createObjectQuery(
                    1,
                    limit,
                    sortBy,
                    orderBy,
                    search,

                )
            );
        }
        else {
            getList(
                await createObjectQuery(
                    1,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                    selectedLM.length === 0 ? optionsLM : selectedLM,
                    selectedTT.length === 0 ? optionsTT : selectedTT
                )
            );
        }

        setDate(new Date())
        handleCloseFilter();

    };

    const handleSort = async (column, sortDirection) => {
        setSortBy(column.text);
        setOrderBy(sortDirection);
        setPage(1);
        if (selectedLM.length === 0 && selectedTT.length === 0) {
            getList(
                await createObjectQuery(
                    1,
                    limit,
                    column.text,
                    sortDirection,
                    search,
                )
            );
        }
        else {
            getList(
                await createObjectQuery(
                    1,
                    limit,
                    column.text,
                    sortDirection,
                    search,
                    selectedLM.length === 0 ? optionsLM : selectedLM,
                    selectedTT.length === 0 ? optionsTT : selectedTT
                )
            );
        }

        handleCloseFilter();

    };

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setLimit(newPerPage);
        setPage(pageNumber);
        if (selectedLM.length === 0 && selectedTT.length === 0) {
            getList(
                await createObjectQuery(
                    pageNumber,
                    newPerPage,
                    sortBy,
                    orderBy,
                    search,
                )
            );
        }
        else {
            getList(
                await createObjectQuery(
                    pageNumber,
                    newPerPage,
                    sortBy,
                    orderBy,
                    search,
                    selectedLM.length === 0 ? optionsLM : selectedLM,
                    selectedTT.length === 0 ? optionsTT : selectedTT
                )
            );
        }

        setDate(new Date())

    }

    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);
        if (selectedLM.length === 0 && selectedTT.length === 0) {
            getList(
                await createObjectQuery(
                    pageNumber,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                )
            );
        }
        else {
            getList(
                await createObjectQuery(
                    pageNumber,
                    limit,
                    sortBy,
                    orderBy,
                    search,
                    selectedLM.length === 0 ? optionsLM : selectedLM,
                    selectedTT.length === 0 ? optionsTT : selectedTT
                )
            );
        }

        setDate(new Date())
    }

    // GET DATA
    const getList = async (params) => {
        console.log(params)
        setPending(true);
        const response = await PromotionServices.getAllPromotions(params)
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

    useEffect(() => {

    }, [date]);
    const onRowClicked = useCallback((row) => {
        navigate('/promotions/details/' + row.discountId);
    }, []);
    return (
        <div>
            <div className='frame'>
                <LinkButton path='/promotions/add' placeholder='Thêm khuyến mãi' icon={<FontAwesomeIcon icon={faPlus} className='me-2' />} />
            </div>
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
                    totalRows={totalRows}
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                    // SORT
                    handleSort={handleSort}
                />
            </div>
        </div>
    );
}

export default PromotionList;