import { format } from 'date-fns';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


export const DiscountItem = [
    {
        name: 'Mã khuyến mãi',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div className=' font-medium text-sm text-[--primary]' data-tag="allowRowEvents">
                {row.promotionId}
            </div>
        ),
    },
    {
        name: 'Tên khuyến mãi',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div className=' font-medium text-sm ' tag="allowRowEvents">
                {row.name}
            </div>
        ),
    },
    {
        name: 'Số phiếu còn lại',
        sortable: true,
        text: 'remainQuantity',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div className=' font-medium text-sm ' tag="allowRowEvents">
                {addCommas(row.remainQuantity)}
            </div>
        ),
    },
    {
        name: 'Ngày bắt đầu',
        sortable: true,
        text: 'startAt',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div className=' font-medium text-sm ' tag="allowRowEvents">
                {format(new Date(row.startAt), 'dd/MM/yyyy')}

            </div>
        ),
    },
    {
        name: 'Ngày kết thúc',
        sortable: true,
        text: 'closeAt',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div className=' font-medium text-sm ' tag="allowRowEvents">
                {format(new Date(row.closeAt), 'dd/MM/yyyy')}
            </div>
        ),
    },
    {
        name: 'Trạng thái',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div
                className={row.status === 'running' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#ecfdf3] text-[#027948] '
                    : row.status === 'paused' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fff7e7] text-[#e4a482]'
                        : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fef3f2] text-[#b32318]'}
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.status === 'running'
                        ? 'Đang chạy'
                        : row.status === 'paused'
                            ? 'Tạm ngừng'
                            : 'Đã hủy'}
                </div>
            </div>
        ),
    },
];
