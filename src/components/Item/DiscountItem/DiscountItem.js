import { format } from 'date-fns';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


export const DiscountItem = [
    {
        name: 'Mã khuyến mãi',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div key={row.promotionId} className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.promotionId}
            </div>
        ),
    },
    {
        name: 'Tên khuyến mãi',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {row.name}
            </div>
        ),
    },
    {
        name: 'Mức áp dụng',
        sortable: true,
        text: 'remainQuantity',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {addCommas(row.remainQuantity)}
            </div>
        ),
    },
    {
        name: 'Loại khuyến mãi',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div
                className={row.style === 'ship' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#ecfdee] text-[#0e7902] '
                    : row.style === 'sale' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fef3f2] text-[#b32318]'
                        : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#f2f2fe] text-[#1822b3]'
                }
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.style === 'ship'
                        ? 'Mã vận chuyển'
                        : row.style === 'sale' ? 'Sale off'
                            : 'Giảm giá thanh toán'
                    }
                </div>
            </div>
        ),
    },
    {
        name: 'Trạng thái',
        MinWidth: '180px',
        center: 'true',
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
