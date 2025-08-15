import React from 'react';


function useEscape{(callback) {
  React.useEffect(
    () => {
      function handleEscape (event) {
        if (event.code !== "Escape") return

        callback()
      }

      window.addEventListener("keydown", handleEscape)


      return () => {
        window.removeEventListener("keydown", handleEscape)
      }
    },
    []
  )
}

export default useEscape;
