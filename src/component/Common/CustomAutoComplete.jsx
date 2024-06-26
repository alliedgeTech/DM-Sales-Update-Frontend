import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'

function CustomAutoCompelete({disable=false,onChange,lable,value,getOptionLabel,readOnly=false,filterOnActive,options,saveData,inputRef,onInputChange,onBlur,hasError,isOptionEqualToValue,fullWidth,disableClearable,clearOnEscape,additionOptions=[],multiple}) {
    const [Loading, setLoading] = useState(false);
    const [RealOptios, setRealOptios] = useState([]);

    useEffect(()=> {
    if(disable) return;
        if(options)
        {
            setRealOptios(options);
            setLoading(false);
        }
        else
        {
            console.log("this option not found.");
        }
    },[options,url,disable]); 
    
  return (
    <Autocomplete
    clearOnEscape={clearOnEscape}
    autoComplete
    autoHighlight
    blurOnSelect={!multiple}
    clearOnBlur
    multiple={multiple}
    disableCloseOnSelect={multiple}
    disableClearable={disableClearable}
    fullWidth={fullWidth}
    options={RealOptios}
    value={value} 
    loading={Loading}
    onBlur={onBlur}
    isOptionEqualToValue={isOptionEqualToValue}
    onChange={(event,newValue) => {
      onChange && onChange(newValue);
    }}
    onInputChange={(event,newValue) => {
      onInputChange && onInputChange(newValue);
    }}
    renderInput={(params) => (
      <TextField
        {...params} 
        sx={{
          "& label.Mui-focused": {
            color: hasError ? "" : "#25396f",
          },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: hasError ? "red" : "#25396f",
            },
          },
        }}
        label={lable}
        inputRef={inputRef}
        error={!!hasError}
        InputProps={{ 
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {Loading ? (
                <CircularProgress color="inherit" size={20} />
              ) : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          )
        }}
      />
    )}
    readOnly={readOnly}
    getOptionLabel={getOptionLabel || null}
    disabled={disable}
  />
  )
}

export default memo(CustomAutoCompelete);