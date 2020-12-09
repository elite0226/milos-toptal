import * as React from 'react';
import { TextField } from '@material-ui/core';

function InputField({
  formik,
  className,
  type = 'text',
  name,
  label,
  onChange,
  onBlur,
  ...rest
}) {
  const handleChange = (event) => {
    formik.handleChange(event);
    if (onChange) {
      onChange(event);
    }
  };

  const handleBlur = (event) => {
    formik.handleBlur(event);
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <TextField
      className={className}
      type={type}
      label={label}
      variant="outlined"
      margin="normal"
      {...formik.getFieldProps(name)}
      error={Boolean(formik.touched[name] && formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      fullWidth
      {...rest}
    />
  );
}

export default InputField;
