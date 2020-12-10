import * as React from 'react';
import { TextField } from '@material-ui/core';

function InputField({
  formik,
  className,
  type = 'text',
  name,
  label,
  options,
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

  if (type === 'select') {
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
        select
        SelectProps={{ native: true }}
      >
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </TextField>
    );
  }

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
