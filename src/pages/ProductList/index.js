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
import * as CategoryServices from '~/apiServices/categoryServices';
import * as BrandServices from '~/apiServices/brandServices';
import { ToastContext } from '~/components/ToastContext';



const optionsPL = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nữ' },
    { label: 'Trẻ em', value: 'Trẻ em' },
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

    const handleSearch = async () => {
        getList(
            await createObjectQuery(
                1,
                limit,
                sortBy,
                orderBy,
                search,
            )
        );

        handleCloseFilter();
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
    const [selectedPL, setSelectedPL] = useState([]);
    const [selectedPriceRange, setSelectedPriceRange] = useState([]);
    const [selectedLSP, setSelectedLSP] = useState([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedLSP([])
        setSelectedManufacturer([])
        setSelectedPL([])
    };
    const getBrand = async () => {
        const response = await BrandServices.getAllBrands()
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
            const data = await response.data.map((cate) => ({ label: cate.name, value: cate._id }));
            setOptionsManufacturer(data);
        }
    }

    // GET DATA SUPPLIERS
    const getCate = async () => {
        const response = await CategoryServices.getAllCategorys(
        )
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
            const data = await response.data.map((sup) => ({ label: sup.name, value: sup._id }));
            setOptionsLSP(data);
        }
    };
    const handleFilter = async () => {
        setPage(1);
        if (selectedManufacturer.length === 0 && selectedLSP.length === 0 && selectedPL.length === 0) {
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
                    selectedManufacturer.length === 0 ? optionsManufacturer : selectedManufacturer,
                    selectedLSP.length === 0 ? optionsLSP : selectedLSP,
                    selectedPL.length === 0 ? optionsPL : selectedPL
                )
            );
        }

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
        search,
        brand,
        category,
        classify
    ) => {



        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(search && { search }),
            ...(brand && { brand }),
            ...(category && { category }),
            ...(classify && { classify }),
        };
    }
    const handlePageChange = async (pageNumber) => {
        setPage(pageNumber);
        if (selectedManufacturer.length === 0 && selectedLSP.length === 0 && selectedPL.length === 0) {
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
                    selectedManufacturer.length === 0 ? optionsManufacturer : selectedManufacturer,
                    selectedLSP.length === 0 ? optionsLSP : selectedLSP,
                    selectedPL.length === 0 ? optionsPL : selectedPL
                )
            );
        }

        setDay(new Date())

    }

    const handlePerRowsChange = async (newPerPage, pageNumber) => {
        setPage(pageNumber);
        setLimit(newPerPage);
        if (selectedManufacturer.length === 0 && selectedLSP.length === 0 && selectedPL.length === 0) {
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
                    selectedManufacturer.length === 0 ? optionsManufacturer : selectedManufacturer,
                    selectedLSP.length === 0 ? optionsLSP : selectedLSP,
                    selectedPL.length === 0 ? optionsPL : selectedPL
                )
            );
        }

        setDay(new Date())

    }
    const handleSort = async (column, sortDirection) => {
        setSortBy(column.text);
        setOrderBy(sortDirection);
        setPage(1);
        if (selectedManufacturer.length === 0 && selectedLSP.length === 0 && selectedPL.length === 0) {
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
                    selectedManufacturer.length === 0 ? optionsManufacturer : selectedManufacturer,
                    selectedLSP.length === 0 ? optionsLSP : selectedLSP,
                    selectedPL.length === 0 ? optionsPL : selectedPL
                )
            );
        }

        handleCloseFilter();

    };
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
            getBrand();
            getCate();
            // console.log(optionsLSP)
            // console.log(optionsManufacturer);
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
                    setSearch={setSearch}
                    pending={pending}
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
                                options={optionsPL}
                                placeholder={'Phân loại'}
                                selected={selectedPL}
                                setSelected={setSelectedPL}
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
                    handlePerRowsChange={handlePerRowsChange}
                    handlePageChange={handlePageChange}
                    // SORT
                    handleSort={handleSort}
                />
            </div>
        </div>
    );
}

export default ProductList;