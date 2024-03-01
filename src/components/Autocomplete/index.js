import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


function SelectAutocomplete({
    onChange,
    options
}) {
    return (
        <Autocomplete
            disablePortal
            options={options}
            onChange={(event, newValue) => {
                onChange(newValue?.value);
            }}
            renderInput={(params) => <TextField {...params} />}
        />

    );
}

export default SelectAutocomplete;