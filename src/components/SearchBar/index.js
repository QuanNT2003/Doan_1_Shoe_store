import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ placeholder, value, onChange, onKeyDown, onClick }) {
    const props = {
        onChange,
    };

    return (
        <div className='min-w-[200px] border-[1px] rounded p-[10px] flex-1 flex justify-center items-center bg-white text-black'>
            <FontAwesomeIcon
                className='text-base cursor-pointer'
                icon={faMagnifyingGlass}
                onClick={() => onClick()}
            />
            <input
                className='flex-1 border-none outline-none h-full ml-3 font-normal font-inter'
                placeholder={placeholder}
                value={value}
                {...props}
            />
        </div>
    );
}

export default SearchBar;
