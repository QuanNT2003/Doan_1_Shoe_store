import { format } from 'date-fns';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const ImportItem = [
    {
        name: 'Mã đơn hàng',
        width: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.importId}
            </div>
        ),
    },
    {
        name: 'Mã sản phẩm',
        width: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.product.productId}
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
            <div className='font-medium' data-tag="allowRowEvents">
                {format(new Date(row.createdAt), 'dd/MM/yyyy - HH:mm')}
            </div>
        ),
    },
    {
        name: 'Số lượng',
        MinWidth: '180px',
        text: 'totalQuantity',
        center: 'true',
        sortable: true,
        cell: (row) => (
            <div className='font-medium' data-tag="allowRowEvents">
                {row.totalQuantity} sản phẩm
            </div>
        ),
    },
    {
        name: 'Tổng cộng',
        MinWidth: '180px',
        center: 'true',
        text: 'totalCost',
        sortable: true,
        cell: (row) => (
            <div className='font-medium' data-tag="allowRowEvents">
                {addCommas(row.totalCost)} đ
            </div>
        ),
    },
]