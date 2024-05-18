import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

import noImage from '~/assets/images/no-image.png';


const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const ProductItem = [
    {
        name: 'Mã sản phẩm',
        grow: 2,
        MinWidth: '250px',
        centet: 'true',
        cell: (row) => (
            <div
                key={row.productId}
                className='flex justify-center items-center pt-[10px] pb-[10px]'
                data-tag="allowRowEvents"
            >
                <div
                    className='min-h-[50px] min-w-[50px] bg-no-repeat bg-center bg-cover mr-[10px]'
                    style={{
                        backgroundImage: `url('${row.images[0].url ? row.images[0].url : noImage}')`,
                    }}
                    data-tag="allowRowEvents"
                ></div>
                <div
                    // className={cx('product-id-name')}
                    data-tag="allowRowEvents"
                >
                    <div className='font-bold mb-[2px]' data-tag="allowRowEvents">
                        {row.productId}
                    </div>
                    <div
                        className='line-clamp-2 text-ellipsis '
                        data-tag="allowRowEvents"
                    >
                        {row.name}
                    </div>
                </div>
            </div>
        ),
    },
    // {
    //     name: 'Trạng thái',
    //     center: 'true',
    //     MinWidth: '180px',
    //     cell: (row) => (
    //         <div
    //             className={
    //                 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] text-[#027948] bg-[#ecfdf3]'
    //                 // row.isActive ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] text-[#027948] bg-[#ecfdf3]'
    //                 //     : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] text-[#b32318] bg-[#fef3f2]'
    //             }
    //             data-tag="allowRowEvents"
    //         >
    //             {/* <FontAwesomeIcon
    //                 className={row.isActive ? 'text-[#12b76a]' : 'text-[#f04438]'}
    //                 icon={row.isActive === true ? faCheck : faXmark}
    //                 data-tag="allowRowEvents"
    //             />
    //             <div className='ml-[5px] font-medium text-center' data-tag="allowRowEvents">
    //                 {row.isActive === true ? 'Đang giao dịch' : 'Ngừng giao dịch'}
    //             </div> */}
    //             <FontAwesomeIcon
    //                 className='text-[#12b76a]'
    //                 icon={faCheck}
    //                 data-tag="allowRowEvents"
    //             />
    //             <div className='ml-[5px] font-medium text-center' data-tag="allowRowEvents">
    //                 'Đang giao dịch'
    //             </div>
    //         </div>
    //     ),
    // },
    {
        name: 'Phân loại',
        center: 'true',
        MinWidth: '180px',
        cell: (row) => (
            <div
                className='text-[#101828] bg-[#d0d5f1] rounded-[20px] py-[5px] px-[10px] flex items-center text-[12px]'
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.classify}
                </div>
            </div>
        ),
    },
    {
        name: 'Loại sản phẩm',
        center: 'true',
        MinWidth: '180px',
        cell: (row) => (
            <div
                className='text-[#101828] bg-[#d0d5f1] rounded-[20px] py-[5px] px-[10px] flex items-center text-[12px]'
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.category.name}
                </div>
            </div>
        ),
    },
    {
        name: 'Giá bán',
        text: 'price',
        sortable: true,
        center: 'true',
        cell: (row) => (
            <div
                className='text-[12px] font-medium'
                data-tag="allowRowEvents"
            >
                <div data-tag="allowRowEvents">
                    {addCommas(row.price)}
                </div>
            </div>
        ),
    },
    {
        name: 'Giá vốn',
        text: 'cost',
        sortable: true,
        center: 'true',
        cell: (row) => (
            <div
                className='text-[12px] font-medium'
                data-tag="allowRowEvents"
            >
                <div data-tag="allowRowEvents">
                    {addCommas(row.cost)}
                </div>
            </div>
        ),
    },
    {
        name: 'Thương hiệu',
        text: 'brand',
        sortable: true,
        center: 'true',
        cell: (row) => (
            <div
                className='text-[12px] font-medium'
                data-tag="allowRowEvents"
            >
                <div data-tag="allowRowEvents">
                    {row.brand.name}
                    {/* {addCommas(row.currentStock)} */}
                </div>
            </div>
        ),
    },
];
