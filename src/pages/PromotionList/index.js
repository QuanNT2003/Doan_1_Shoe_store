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

    const returnArray = (arr) => {
        return arr.map((obj) => obj.value);
    }


    // API PROPS
    const [pageNumber, setPageNumber] = useState(1);
    const [pageSize, setPageSize] = useState(12);
    const [totalRows, setTotalRows] = useState(0);
    const [sortBy, setSortBy] = useState('');
    const [orderBy, setOrderBy] = useState('');


    const createObjectQuery = async (
        pageNumber,
        pageSize,
        sortBy,
        orderBy,
        statuses,
        isOutdated,
        query,
    ) => {

        let arr = [];
        if (isOutdated) {
            if (isOutdated.length < 2) {
                arr = [...isOutdated];
            }
        }

        return {
            pageNumber,
            pageSize,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(statuses && { statuses }),
            ...(isOutdated && { isOutdated: arr }),
            ...(query && { query }),
        };
    }
    const [search, setSearch] = useState('')
    const handleSearch = (e) => {
        setSearch(e.target.value);
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

    };

    const handleFilter = async () => {

        handleCloseFilter();
    };



    // GET DATA
    const getList = async (obj) => {
        setPending(true);

        const response = await PromotionServices.getAllPromotions(obj)
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
            console.log(response.data);
            setPending(false);
            setRows(response.data);
            setTotalRows(response.data.length);
        }
    }
    useEffect(() => {
        const fetch = async () => {


            getList(
                await createObjectQuery(
                    pageNumber,
                    pageSize,
                    sortBy,
                    orderBy,
                    selectedTT.length > 0 && returnArray(selectedTT),
                    selectedLM.length > 0 && returnArray(selectedLM),
                    search,
                ));
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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