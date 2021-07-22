import React from 'react';
import {FormControl, FormHelperText, InputLabel, NativeSelect} from "@material-ui/core";

function CountrySelector(props) {
    return (
        <FormControl>
            <InputLabel htmlFor="" shrink>Quốc gia</InputLabel>
            <NativeSelect value={props.value} onChange={props.handleOnChangeCountry}
                          inputProps={{name: 'country', id: 'country-selector'}}>
                {
                    props.countries && props.countries.length > 0 && props.countries.map((item) =>
                        <option value={item.ISO2.toLowerCase()}>
                            {item.Country}
                        </option>)
                }
            </NativeSelect>
            <FormHelperText>Lựa chọn quốc gia</FormHelperText>
        </FormControl>
    );
}

export default CountrySelector;