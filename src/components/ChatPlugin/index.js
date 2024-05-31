import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRocketchat
} from '@fortawesome/free-brands-svg-icons';
function ChatPlugin() {
    const [stype, setStype] = useState(false)
    return (
        <div className=' fixed bottom-5 right-5'>
            {
                stype === false ? (
                    <Fab color="primary" aria-label="add" className='w-[100px] h-[100px]' onClick={() => setStype(true)}>
                        <FontAwesomeIcon icon={faRocketchat} />
                    </Fab>
                ) : (
                    <div className='h-[500px] w-[400px] bg-white' onClick={() => setStype(false)}> 123</div>
                )
            }

        </div>
    );
}

export default ChatPlugin;