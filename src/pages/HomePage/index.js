import React, { useState } from 'react';
import DatePicker from '~/components/DatePicker';
import DateRange from '~/components/DateRange';

function HomePage() {
    const [dateString, setDateString] = useState('');
    return (
        <div>
            Home Page
            <div className='w-[300px]'>
                <DatePicker />

                <DateRange
                    dateString={dateString}
                    setDateString={setDateString}
                    bottom
                    future
                />
            </div>
        </div>
    );
}

export default HomePage;