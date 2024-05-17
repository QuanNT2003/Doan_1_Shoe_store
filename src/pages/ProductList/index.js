import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import { ProductItem } from '~/components/Item';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import SubHeader from '~/components/SubHeader';
import LinkButton from '~/components/LinkButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faList
} from '@fortawesome/free-solid-svg-icons';
import * as ProductServices from '~/apiServices/productServices'
import { ToastContext } from '~/components/ToastContext';

const rows = [
    {
        productId: 'SP001',
        images: [
            'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/426571080_1792048851310816_3127445872686098501_n.jpg?stp=c4.0.320.320a_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeF_O5dUR3hggeTQC4elh9BpKpda0SuVut4ql1rRK5W63q_d94FqKsQ3gCpk2OGaz7u-1xTsr65bfU8lhl3E2bo2&_nc_ohc=LaSPX4gBZA4AX-odx-Y&_nc_ht=scontent.fhan4-3.fna&oh=00_AfA_TZZxSCg8GaRj2Digu-EMrpq3hYEyj96MeFENslOadg&oe=65E8A4D2'
        ],
        name: 'Mot hai ba',
        isActive: true,
        categoryText: 'mot hai ba',
        salePrice: 100000,
        purchasePrice: 80000,
        currentStock: 100,

    },
    {
        productId: 'SP002',
        images: [
            'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/426571080_1792048851310816_3127445872686098501_n.jpg?stp=c4.0.320.320a_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeF_O5dUR3hggeTQC4elh9BpKpda0SuVut4ql1rRK5W63q_d94FqKsQ3gCpk2OGaz7u-1xTsr65bfU8lhl3E2bo2&_nc_ohc=LaSPX4gBZA4AX-odx-Y&_nc_ht=scontent.fhan4-3.fna&oh=00_AfA_TZZxSCg8GaRj2Digu-EMrpq3hYEyj96MeFENslOadg&oe=65E8A4D2'
        ],
        name: 'Mot hai ba',
        isActive: true,
        categoryText: 'mot hai ba',
        salePrice: 100000,
        purchasePrice: 80000,
        currentStock: 100,

    },
    {
        productId: 'SP003',
        images: [
            'https://scontent.fhan4-3.fna.fbcdn.net/v/t39.30808-1/426571080_1792048851310816_3127445872686098501_n.jpg?stp=c4.0.320.320a_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=5740b7&_nc_eui2=AeF_O5dUR3hggeTQC4elh9BpKpda0SuVut4ql1rRK5W63q_d94FqKsQ3gCpk2OGaz7u-1xTsr65bfU8lhl3E2bo2&_nc_ohc=LaSPX4gBZA4AX-odx-Y&_nc_ht=scontent.fhan4-3.fna&oh=00_AfA_TZZxSCg8GaRj2Digu-EMrpq3hYEyj96MeFENslOadg&oe=65E8A4D2'
        ],
        name: 'Mot hai ba',
        isActive: true,
        categoryText: 'mot hai ba',
        salePrice: 100000,
        purchasePrice: 80000,
        currentStock: 100,

    },
]

const optionsTT = [
    { label: 'Đang giao dịch', value: true },
    { label: 'Ngừng giao dịch', value: false },
];

const optionsPriceRange = [
    { label: '0đ - 150,000đ', value: '0-150000' },
    { label: '150,000đ - 300,000đ', value: '150000-300000' },
    { label: '300,000đ - 500,000đ', value: '300000-500000' },
    { label: '500,000đ - 700,000đ', value: '500000-700000' },
    { label: '700,000đ - Trở lên', value: '700000-50000000' },
];
function ProductList() {
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

    // Filter Options
    const [optionsLSP, setOptionsLSP] = useState([]);
    const [optionsManufacturer, setOptionsManufacturer] = useState([]);

    //Filter
    const [selectedTT, setSelectedTT] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedLSP, setSelectedLSP] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {

    };

    const handleFilter = async () => {

        handleCloseFilter();
    };

    //SubHeader
    const [showSubHeader, setShowSubHeader] = useState(false);
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedDelRows, setSelectedDelRows] = useState();

    const handleSelectedProducts = ({
        allSelected,
        selectedCount,
        selectedRows,
    }) => {
        selectedCount > 0 ? setShowSubHeader(true) : setShowSubHeader(false);
        setSelectedRow(selectedCount);
        setSelectedDelRows(selectedRows);
    };


    const onRowClicked = useCallback((row) => {
        navigate('/products/details/' + row.productId);
    }, []);

    const createObjectQuery = async (
        page,
        limit,
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
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(statuses && { statuses }),
            ...(isOutdated && { isOutdated: arr }),
            ...(query && { query }),
        };
    }
    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);
        setDay(new Date())

    }

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setPage(pageNumber);
        setLimit(newPerPage);
        setDay(new Date())

    }

    const getList = async (obj) => {
        setPending(true);

        const response = await ProductServices.getAllProducts(obj)
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



    return (
        <div>
            <div className='frame flex'>
                <LinkButton path='/products/add' placeholder='Thêm sản phẩm' icon={<FontAwesomeIcon icon={faPlus} />} />
                <LinkButton path='/products/colors' placeholder='Danh sách mẫu màu' icon={<FontAwesomeIcon icon={faList} />} />
            </div>
            <div className='frame'>
                <List
                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên sản phẩm'}
                    search={search}
                    handleSearch={handleSearch}
                    filterComponent={
                        <Filter
                            open={openFilter}
                            handleClose={handleCloseFilter}
                            handleOpen={handleOpenFilter}
                            handleClearFilter={handleClearFilter}
                            handleFilter={handleFilter}
                        > <MultiSelectComp

                                options={optionsPriceRange}
                                placeholder={'Giá bán'}
                                selected={selectedPriceRange}
                                setSelected={setSelectedPriceRange}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp

                                options={optionsLSP}
                                placeholder={'Loại sản phẩm'}
                                selected={selectedLSP}
                                setSelected={setSelectedLSP}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp
                                className=''
                                options={optionsTT}
                                placeholder={'Trạng thái'}
                                selected={selectedTT}
                                setSelected={setSelectedTT}
                                hasSelectAll={true}
                            />
                            <MultiSelectComp

                                options={optionsManufacturer}
                                placeholder={'Thương hiệu'}
                                selected={selectedManufacturer}
                                setSelected={setSelectedManufacturer}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }
                    // TABLE
                    pagination
                    onRowClicked={onRowClicked}
                    showSubHeader={showSubHeader}
                    itemComponent={ProductItem}
                    selectableRows
                    data={rows}
                    subHeaderComponent={
                        <SubHeader
                            count={selectedRow}
                            itemName={'sản phẩm'}
                            // onClickAction={}
                            items={[
                                'Xóa sản phẩm',
                            ]}
                        />
                    }
                    // pending={pending}
                    handleSelectedItems={handleSelectedProducts}

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

export default ProductList;