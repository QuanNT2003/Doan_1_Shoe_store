import { format } from 'date-fns';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');


export const DiscountItem = [
    {
        name: 'Mã khuyến mãi',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div key={row.discountId} className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.discountId}
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
        text: 'apply',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium' tag="allowRowEvents">
                {addCommas(row.apply)}
            </div>
        ),
    },
    {
        name: 'Loại khuyến mãi',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div
                className={row.classify === 'ship' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#ecfdee] text-[#0e7902] '
                    : row.classify === 'sale' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fef3f2] text-[#b32318]'
                        : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#f2f2fe] text-[#1822b3]'
                }
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.classify === 'ship'
                        ? 'Mã vận chuyển'
                        : row.classify === 'sale' ? 'Sale off'
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
                className={row.status === true ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#ecfdf3] text-[#027948] '
                    : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fef3f2] text-[#b32318]'}
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.status === true
                        ? 'Đang chạy'
                        : 'Đã hủy'}
                </div>
            </div>
        ),
    },
];
