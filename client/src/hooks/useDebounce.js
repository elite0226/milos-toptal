import * as React from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeId);
    };
  }, [value, delay]);

  return debouncedValue;
}
