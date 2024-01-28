import React from 'react';


function defaultLayoutClient({ children }) {
    return (
        <div>
            Client Layouts
            <div >{children}</div>
        </div>
    );
}

export default defaultLayoutClient;