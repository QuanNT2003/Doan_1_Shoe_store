import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const CommentItem = [
    {
        name: 'Mã sản phẩm',
        width: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.productId}
            </div>
        ),
    },
    {
        name: 'Khách hàng',
        width: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.user.name}
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
        name: 'Trạng thái',
        center: 'true',
        MinWidth: '180px',
        cell: (row) => (
            <div
                className={row.approve ? 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] bg-[#ecfdf3] text-[#027948]'
                    : 'flex justify-center items-center rounded-[20px] py-[5px] px-[10px] text-[12px] bg-[#fef3f2] text-[#b32318]'}
                data-tag="allowRowEvents"
            >
                <FontAwesomeIcon
                    className={row.approve ? 'text-[#12b76a]' : 'text-[#f04438]'}
                    icon={row.approve ? faCheck : faXmark}
                    data-tag="allowRowEvents"
                />
                <div className='ml-[5px] text-center font-medium' data-tag="allowRowEvents">
                    {row.approve ? 'Đã duyệt' : 'Chưa duyệt'}
                </div>
            </div>
        ),
    },
]