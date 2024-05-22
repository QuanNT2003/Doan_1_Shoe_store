import React, { useState, useCallback, useEffect, useContext } from 'react';
import Brand_WC_Item from '~/components/Brand_WC_Item';
import MultiSelectComp from '~/components/MultiSelectComp';
import SearchBar from '~/components/SearchBar';
import { ToastContext } from '~/components/ToastContext';
import * as BrandServices from '~/apiServices/brandServices';
import BrandList from '~/components/BrandList';
import ModalLoading from '~/components/ModalLoading';
import { Button } from '@mui/material';

function BrandListPage() {
    const toastContext = useContext(ToastContext);
    const [search, setSearch] = useState('')


    const [pending, setPending] = useState(false);
    const [rows, setRows] = useState([]);

    const [day, setDay] = useState(new Date())

    const [optionsNation, setOptionsNation] = useState([]);

    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(4);
    const [totalPage, setTotalPage] = useState(0);
    //Filter
    const [selectedNation, setSelectedNation] = useState([]);

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
    const getList = async (obj) => {
        setPending(true);

        const response = await BrandServices.getAllBrands(obj)
            .catch((error) => {
                setPending(false);

                if (error?.response?.status === 404) {
                    setRows([]);
                    setTotalPage(0);
                } else {
                    toastContext.notify('error', 'Có lỗi xảy ra');
                }
            });

        if (response) {
            console.log(response);
            setPending(false);
            setRows(response.data);
            setTotalPage(response.totalPage);

        }
    }
    const handleFilter = async () => {
        setPage(1);
        getList(
            await createObjectQuery(
                1,
                limit,
                '',
                '',
                search,
                selectedNation
            )
        );
        setDay(new Date())
    };
    const changePage = async (newPage) => {
        setPage(newPage)
        getList(
            await createObjectQuery(
                newPage,
                limit,
                '',
                '',
                search,
                selectedNation
            ));
        setDay(new Date())
    }
    useEffect(() => {
        const fetch = async () => {
            getList(
                await createObjectQuery(
                    page,
                    limit,
                    '',
                    '',
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
            <div className='bg-white m-4 mb-10 rounded-lg '>
                <div className='font-bold p-3 pb-1 text-[18px] mb-3'>
                    Danh sách thương hiệu
                </div>
                <BrandList
                    list={rows}
                    totalPage={totalPage}
                    changePage={changePage}
                    filter={
                        <div className='bg-white p-3 border'>
                            <div className=' lg:flex'>
                                <div className='mx-4 w-[250px] my-3'>
                                    <MultiSelectComp

                                        options={optionsNation}
                                        placeholder={'Quốc gia'}
                                        selected={selectedNation}
                                        setSelected={setSelectedNation}
                                        hasSelectAll={true}
                                    />
                                </div>
                                <div className='mx-4 ssm:w-[400px] w-[250px] my-3 lg:w-[600px] flex items-center'>
                                    <SearchBar placeholder={'Tim kiếm thương hiệu'} onChange={(e) => setSearch(e.target.value)} onClick={handleFilter} />
                                </div>
                            </div>
                            <div className='flex gap-2 ps-4'>
                                <Button
                                    className=' p-4 font-semibold mr-[20px] hover:bg-blue-600 hover:text-stone-600'
                                    variant="outlined"
                                    onClick={() => {
                                        setSearch('')
                                        setSelectedNation([])
                                    }}
                                >
                                    Xóa bộ lọc
                                </Button>
                                <Button
                                    className=' p-4 font-semibold mr-[20px] hover:bg-blue-600 hover:text-stone-600'
                                    variant="outlined"
                                    onClick={handleFilter}
                                >
                                    Lọc
                                </Button>
                            </div>

                        </div>
                    }
                />


                <ModalLoading open={pending} title={'Đang tải'} />

            </div>
        </div>
    );
}

export default BrandListPage;