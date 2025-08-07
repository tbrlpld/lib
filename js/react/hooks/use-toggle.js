import React from 'react';

function useToggle(initial) {
  const [value, setValue] = React.useState(Boolean(initial))

  function toggle() {
    setValue(currentValue => !currentValue)
  }

  return [value, toggle]
}

export default useToggle;
