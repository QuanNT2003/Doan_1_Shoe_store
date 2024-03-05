import React from 'react';
import { useNavigate } from 'react-router-dom';
function LinkButton({ path, placeholder, icon }) {
    const navigate = useNavigate();
    const onclick = () => {
        navigate(path)
    }
    return (
        <div>
            <button className='bg-blue-500 py-4 px-3 flex rounded-lg min-w-[100px] text-white hover:bg-[#3a57e8] cursor-pointer text-sm me-4' onClick={onclick}>
                <div className='me-2'> {icon} </div>
                {placeholder}
            </button>
        </div>
    );
}

export default LinkButton;