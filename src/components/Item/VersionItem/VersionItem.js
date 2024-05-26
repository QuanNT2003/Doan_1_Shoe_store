import { format } from 'date-fns';

const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const VersionItem = [
    {
        name: 'Mã phiên bản',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium text-[--primary]' data-tag="allowRowEvents">
                {row.versionId}
            </div>
        ),
    },
    {
        name: 'Màu sắc',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium ' data-tag="allowRowEvents">
                {row.color.name}
            </div>
        ),
    },
    {
        name: 'Size',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium ' data-tag="allowRowEvents">
                {row.size.name}
            </div>
        ),
    },
    {
        name: 'Số lượng trong kho',
        MinWidth: '180px',
        center: 'true',
        cell: (row) => (
            <div className='font-medium ' data-tag="allowRowEvents">
                {row.inStock}
            </div>
        ),
    },
]