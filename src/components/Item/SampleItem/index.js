export const SampleItem = [
    {
        name: 'STT',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div >
                {row.id}
            </div>
        ),
    },
    {
        name: 'Tên',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div>
                {row.name}
            </div>
        ),
    },
    {
        name: 'Giới tính',
        minWidth: '180px',
        center: true,
        cell: (row) => (
            <div >
                {row.sex}
            </div>
        ),
    }

]