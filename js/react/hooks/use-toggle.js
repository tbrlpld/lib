import React from 'react';

function useToggle(initial = false) {
  if (typeof initial !== "boolean") {
    throw new Error("useToggle can only be used with boolean initial values")
  }

  const [value, setValue] = React.useState(initial)

  function toggle() {
    setValue(currentValue => !currentValue)
  }

  return [value, toggle]
}

export default useToggle;
