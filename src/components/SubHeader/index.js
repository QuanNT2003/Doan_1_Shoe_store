import ActionDropdown from '~/components/ActionDropdown';



function SubHeader({ items, count, itemName, onClickAction }) {
    return (
        <div className='flex justify-center items-center flex-wrap'>
            <div className='mr-5'>
                Đã chọn {count} {itemName} trên trang này
            </div>
            <div>
                <ActionDropdown items={items} onClickAction={onClickAction} />
            </div>
        </div>
    );
}

export default SubHeader;
