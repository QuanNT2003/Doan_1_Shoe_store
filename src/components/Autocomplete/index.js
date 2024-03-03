import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function SelectAutocomplete({
    onChange,
    options,
    value
}) {
    return (
        <Autocomplete
            disablePortal
            options={options}
            value={value}
            onChange={(event, newValue) => {
                onChange(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
        />

    );
}

export default SelectAutocomplete;