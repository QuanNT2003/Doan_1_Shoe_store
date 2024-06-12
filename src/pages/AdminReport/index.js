import React, { useState, useEffect, useContext } from 'react';
import { ConvertISO } from '~/components/ConvertISO';
import { ToastContext } from '~/components/ToastContext';
import { format } from 'date-fns';
import ChartComp from '~/components/ChatComp';
import * as reportServices from '~/apiServices/reportServices'
import Input from '~/components/Input';
import DateRange from '~/components/DateRange';
import { CircularProgress } from '@mui/material';

const thousandBreakOptions = {
    scales: {
        y: {
            ticks: {
                callback(value) {
                    return Number(value).toLocaleString('en')
                }
            }
        }
    }
};

const topProductsOptions = {
    plugins: {
        legend: {
            position: 'right',
        },
    },
    indexAxis: 'y',
    scales: {
        x: {
            ticks: {
                callback(value) {
                    return Number(value).toLocaleString('en')
                }
            }
        }
    }
};
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
function SellReport() {
    const toastContext = useContext(ToastContext);
    const [totalCost, setTotalCost] = useState(0)
    const [totalRevenue, setTotalRevenue] = useState(0)

    const createObjectQuery = async (
        startDate,
        endDate,
        groupBy,
    ) => {
        return {
            startDate,
            endDate,
            groupBy,
        };
    }

    // MONEY
    const [loadingMoney, setLoadingMoney] = useState(false);
    const [chartType, setChartType] = useState({ label: 'Biểu đồ cột', value: 'bar' });

    const [moneyLabels, setMoneyLabels] = useState([]);
    const [revenues, setRevenues] = useState([]);
    const [invests, setInvests] = useState([]);
    const [dateString, setDateString] = useState('');
    const [groupBy, setGroupBy] = useState({ label: 'Ngày', value: 'day' })

    const revenuesDatasets = [
        {
            label: 'Doanh thu',
            data: revenues,
            // backgroundColor: "#3a57e8",
            // borderColor: '#3a57e8',
        },
        {
            label: 'Nhập hàng',
            data: invests,
        }
    ];
    const handleGetMoney = async (obj) => {
        setLoadingMoney(true);

        const responseMoney = await reportServices.GetMoney(obj)
            .catch((error) => {
                console.log(error);
                toastContext.notify('error', 'Có lỗi xảy ra');
            });

        if (responseMoney) {
            console.log(responseMoney);
            setRevenues(responseMoney.totalRevenue)
            setInvests(responseMoney.totalCost)
            setMoneyLabels(responseMoney.timePeriods)
            let cost = 0
            for (let item of responseMoney.totalCost) cost += item
            setTotalCost(cost)

            let revenue = 0
            for (let item of responseMoney.totalRevenue) revenue += item
            setTotalRevenue(revenue)

        }

        setLoadingMoney(false);
    };


    const callGetRevenues = async () => {
        handleGetMoney(
            await createObjectQuery(
                dateString && ConvertISO(dateString).startDate,
                dateString && ConvertISO(dateString).endDate,
                groupBy.value
            )
        );
    }
    // TOP PRODUCTS
    const [topProductsLabels, setTopProductsLabels] = useState([]);
    const [topProductsQuantity, setTopProductsQuantity] = useState([]);
    const [label, setLabel] = useState('Sản phẩm')

    const callTopSell = async (value) => {
        const fetch = async () => {
            const now = new Date();

            if (value === 1) {
                const responseTopProducts = await reportServices.GetTopProduct(
                    {
                        month: now.getMonth() + 1,
                        year: now.getFullYear(),
                    }
                )
                    .catch((error) => {
                        console.log(error);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (responseTopProducts) {
                    console.log(responseTopProducts);
                    setTopProductsLabels(responseTopProducts.productNames);
                    setTopProductsQuantity(responseTopProducts.quantities);
                }
            } else if (value === 2) {
                const responseTopProducts = await reportServices.GetTopBrand(
                    {
                        month: now.getMonth() + 1,
                        year: now.getFullYear(),
                    }
                )
                    .catch((error) => {
                        console.log(error);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (responseTopProducts) {
                    console.log(responseTopProducts);
                    setTopProductsLabels(responseTopProducts.brandNames);
                    setTopProductsQuantity(responseTopProducts.quantities);
                }
            }
            else {
                const responseTopProducts = await reportServices.GetTopCate(
                    {
                        month: now.getMonth() + 1,
                        year: now.getFullYear(),
                    }
                )
                    .catch((error) => {
                        console.log(error);
                        toastContext.notify('error', 'Có lỗi xảy ra');
                    });

                if (responseTopProducts) {
                    console.log(responseTopProducts);
                    setTopProductsLabels(responseTopProducts.categorieNames);
                    setTopProductsQuantity(responseTopProducts.quantities);
                }
            }

        }

        fetch();
    }
    const topProductsDatasets = [
        {
            label: 'Số lượng',
            data: topProductsQuantity,
            // backgroundColor: "#3a57e8",
            // borderColor: '#3a57e8',
        },
    ];

    useEffect(() => {
        const fetch = async () => {
            const now = new Date();

            const responseTopProducts = await reportServices.GetTopProduct(
                {
                    month: now.getMonth() + 1,
                    year: now.getFullYear(),
                }
            )
                .catch((error) => {
                    console.log(error);
                    toastContext.notify('error', 'Có lỗi xảy ra');
                });

            if (responseTopProducts) {
                console.log(responseTopProducts);
                setTopProductsLabels(responseTopProducts.productNames);
                setTopProductsQuantity(responseTopProducts.quantities);
            }
        }

        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div>
            <div className='frame p-5'>
                <div className='font-semibold'>Doanh thu</div>
                <div className=' md:flex items-center p-3'>
                    <div className='w-[250px] me-4 mt-3'>
                        <div className='font-medium'>Thời gian áp dụng</div>
                        <div className=''>
                            <DateRange
                                dateString={dateString}
                                setDateString={setDateString}
                                bottom
                                future
                            />
                        </div>
                    </div>

                    <Input
                        className='mt-3 mb-3 w-[150px]'
                        title={'Nhóm theo'}
                        items={
                            [
                                { label: 'Ngày', value: 'day' },
                                { label: 'Tháng', value: 'month' },
                                { label: 'Năm', value: 'year' },
                            ]
                        }
                        value={groupBy.label}
                        handleClickAction={(item) => {
                            setGroupBy(item)
                        }}
                    />
                    <Input
                        className='md:ms-4 mt-3 mb-3 w-[150px]'
                        title={'Loại biểu đồ'}
                        items={
                            [
                                { label: 'Biểu đồ cột', value: 'bar' },
                                { label: 'Biểu đồ đường', value: 'line' }
                            ]
                        }
                        value={chartType.label}
                        handleClickAction={(item) => setChartType(item)}
                        readOnly
                    />
                    <div className='md:ms-6 mt-4'>
                        <button className='bg-blue-500 py-4 px-3 rounded-lg min-w-[130px] text-white hover:bg-[#3a57e8] cursor-pointer' onClick={() => callGetRevenues()}>
                            Xem báo cáo
                        </button>
                    </div>
                    {loadingMoney && <CircularProgress
                        className='max-w-[200px] ml-5'
                        color="primary"
                    />}
                </div>
                <div className='md:flex'>
                    <div className='md:w-[50%] flex flex-col items-center'>
                        <div>Tổng doanh thu</div>
                        <div className='text-[25px] font-medium text-blue-600 mt-3'>{addCommas(totalRevenue)} đ</div>
                    </div>
                    <div className='md:w-[50%] flex flex-col items-center'>
                        <div>Tổng nhập hàng</div>
                        <div className='text-[25px] font-medium text-pink-600 mt-3'>{addCommas(totalCost)} đ</div>
                    </div>
                </div>
                <div className='h-[900px]'>
                    <ChartComp type={chartType.value}
                        labels={moneyLabels}
                        datasets={revenuesDatasets}
                        options={thousandBreakOptions}
                    />
                </div>


            </div>
            <div className='frame p-5'>
                <div className='font-semibold'>Top {label} bán chạy nhất</div>
                <div className='w-[150px]'>
                    <Input
                        className='mt-3 mb-3'
                        title={'Phân loại'}
                        items={
                            [
                                { label: 'Sản phẩm', value: 1 },
                                { label: 'Thương hiệu', value: 2 },
                                { label: 'Loại sản phẩm', value: 3 },
                            ]
                        }
                        value={label}
                        handleClickAction={(item) => {
                            setLabel(item.label);
                            callTopSell(item.value)
                        }}
                    />
                </div>
                <div className='h-[900px]'>
                    <ChartComp type={'bar'}
                        labels={topProductsLabels}
                        datasets={topProductsDatasets}
                        options={topProductsOptions}
                    />
                </div>


            </div>
        </div>
    );
}

export default SellReport;