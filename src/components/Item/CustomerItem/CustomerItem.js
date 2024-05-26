import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const CustomerItem = [
    {
        name: 'Mã khách hàng',
        MinWidth: '180px',
        cell: (row) => (
            <div className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.userId}
            </div>
        ),
    },
    {
        name: 'Tên khách hàng',
        MinWidth: '180px',
        cell: (row) => (
            <div className='font-medium' data-tag="allowRowEvents">
                {row.name}
            </div>
        ),
    },
    {
        name: 'Số điện thoại',
        MinWidth: '180px',
        cell: (row) => (
            <div className='font-medium' data-tag="allowRowEvents">
                {row.phone}
            </div>
        ),
    },
    {
        name: 'Trạng thái',
        center: 'true',
        MinWidth: '180px',
        cell: (row) => (
            <div
                className={row.active ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] bg-[#ecfdf3] text-[#027948]'
                    : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] bg-[#fef3f2] text-[#b32318]'}
                data-tag="allowRowEvents"
            >
                <FontAwesomeIcon
                    className={row.active ? 'text-[#12b76a]' : 'text-[#f04438]'}
                    icon={row.active ? faCheck : faXmark}
                    data-tag="allowRowEvents"
                />
                <div className='ml-[5px] text-center font-medium' data-tag="allowRowEvents">
                    {row.active ? 'Đang hoạt động' : 'Bị khóa'}
                </div>
            </div>
        ),
    },
    // {
    //     name: 'Tổng đơn hàng',
    //     text: 'purchasedOrder',
    //     center: 'true',
    //     sortable: true,
    //     MinWidth: '180px',
    //     cell: (row) => (
    //         <div className='font-medium' data-tag="allowRowEvents">
    //             {addCommas(row.purchasedOrder)}
    //         </div>
    //     ),
    // },
];
