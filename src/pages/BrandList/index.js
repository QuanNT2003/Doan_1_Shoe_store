import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '~/components/List';
import Filter from '~/components/Filter';
import MultiSelectComp from '~/components/MultiSelectComp';
import { BrandItem } from '~/components/Item';
import LinkButton from '~/components/LinkButton';
import * as BrandServices from '~/apiServices/brandServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ToastContext } from '~/components/ToastContext';

function BrandList() {
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
    const [optionsNation, setOptionsNation] = useState([]);


    //Filter
    const [selectedSL, setSelectedSL] = useState([]);
    const [selectedNation, setSelectedNation] = useState([]);
    const [openFilter, setOpenFilter] = useState(false);
    const handleOpenFilter = () => setOpenFilter(true);
    const handleCloseFilter = () => setOpenFilter(false);
    const handleClearFilter = () => {
        setSelectedNation([])
    };

    const createObjectQuery = async (
        page,
        limit,
        sortBy,
        orderBy,
        search,
        nation
    ) => {


        return {
            limit,
            page,
            ...(orderBy && { orderBy }),
            ...(sortBy && { sortBy }),
            ...(search && { search }),
            ...(nation && { nation }),
        };
    }
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
    const getList = async (obj) => {
        setPending(true);

        const response = await BrandServices.getAllBrands(obj)
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
    const handleFilter = async () => {
        setPage(1);
        let QG = []

        if (selectedNation.length !== 0) {
            for (let option of selectedNation) QG.push(option.value)
        } else QG = undefined
        getList(
            await createObjectQuery(
                1,
                limit,
                sortBy,
                orderBy,
                search,
                QG
            )
        );
        setDay(new Date())
        handleCloseFilter();
    };
    const onRowClicked = useCallback((row) => {
        navigate('/brands/details/' + row.brand.brandId);
    }, []);


    const getNation = async () => {
        const response = await BrandServices.getNation()
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
            const data = await response.data.map((nation) => ({ label: nation, value: nation }));
            setOptionsNation(data);
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
            getNation()
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

    }, [day]);
    return (
        <div>
            <div className='frame'>
                <LinkButton path='/brands/add' placeholder='Thêm thương hiệu' icon={<FontAwesomeIcon icon={faPlus} className='me-2' />} />
            </div>
            <div className='frame'>
                <List
                    searchVisibility={true}
                    placeholderSearch={'Tìm kiếm theo mã, tên thương hiệu '}
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

                                options={optionsNation}
                                placeholder={'Quốc gia'}
                                selected={selectedNation}
                                setSelected={setSelectedNation}
                                hasSelectAll={true}
                            />
                        </Filter>
                    }
                    // TABLE
                    pagination
                    onRowClicked={onRowClicked}
                    itemComponent={BrandItem}
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

export default BrandList;