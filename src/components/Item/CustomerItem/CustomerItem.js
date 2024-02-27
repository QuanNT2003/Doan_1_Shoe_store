import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';


const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const CustomerItem = [
    {
        name: 'Mã khách hàng',
        minWidth: '180px',
        cell: (row) => (
            <div className='font-medium text-sm text-[--primary]' data-tag="allowRowEvents">
                {row.customerId}
            </div>
        ),
    },
    {
        name: 'Tên khách hàng',
        minWidth: '180px',
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {row.name}
            </div>
        ),
    },
    {
        name: 'Số điện thoại',
        minWidth: '180px',
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {row.phoneNumber}
            </div>
        ),
    },
    {
        name: 'Trạng thái',
        center: 'true',
        minWidth: '180px',
        cell: (row) => (
            <div
                className={row.isActive ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] bg-[#ecfdf3] text-[#027948]'
                    : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] bg-[#fef3f2] text-[#b32318]'}
                data-tag="allowRowEvents"
            >
                <FontAwesomeIcon
                    className={row.isActive ? 'text-[#12b76a]' : 'text-[#f04438]'}
                    icon={row.isActive ? faCheck : faXmark}
                    data-tag="allowRowEvents"
                />
                <div className='ml-[5px] text-center font-medium' data-tag="allowRowEvents">
                    {row.isActive ? 'Đang hoạt động' : 'Bị khóa'}
                </div>
            </div>
        ),
    },
    {
        name: 'Tổng đơn hàng',
        text: 'purchasedOrder',
        center: 'true',
        sortable: true,
        minWidth: '180px',
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {addCommas(row.purchasedOrder)}
            </div>
        ),
    },
];
