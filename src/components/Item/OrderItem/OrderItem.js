import { format } from 'date-fns';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const OrderItem = [
    {
        name: 'Mã đơn hàng',
        width: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-sm text-[--primary]' data-tag="allowRowEvents">
                {row.salesOrderId}
            </div>
        ),
    },
    {
        name: 'Ngày tạo đơn',
        text: 'createdAt',
        width: '200px',
        center: 'true',
        sortable: true,
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {format(new Date(row.createdAt), 'dd/MM/yyyy - HH:mm')}
            </div>
        ),
    },
    {
        name: 'Tên khách hàng',
        minWidth: '180px',
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {row.customerName}
            </div>
        ),
    },
    {
        name: 'Khách phải trả',
        minWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-sm' data-tag="allowRowEvents">
                {addCommas(row.totalAmount)}
            </div>
        ),
    },
    {
        name: 'Trạng thái',
        minWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div
                className={row.status === 'receiving' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fff7e7] text-[#e4a482] '
                    : row.status === 'delivering' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fff7e7] text-[#e4a482]'
                        : row.status === 'delivered' ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#ecfdf3] text-[#027948]'
                            : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-xs bg-[#fef3f2] text-[#b32318]'}
                data-tag="allowRowEvents"
            >
                <div className='font-medium text-center' data-tag="allowRowEvents">
                    {row.status === 'receiving'
                        ? 'Đang tiếp nhận'
                        : row.status === 'delivering'
                            ? 'Đang giao'
                            : row.status === 'delivered' ? 'Đã giao' : 'Đã hủy đơn'}
                </div>
            </div>
        ),
    },

];