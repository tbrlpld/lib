import React from 'react';

/**
 * Run a callback when a click outside an element occurs.
 *
 * Pass a React ref to the element (React.useRef) that should be considered "inside".
 * A click inside the given element won't trigger the callback.
 *
 * If the click is outside the element, the callback is called with no arguments.
 */
function useClickOutside(insideRef, callback) {
  React.useEffect(
    function setUpClickOutsideHandling() {

      function handleDocumentClick(event) {
        if (!insideRef || !insideRef.current) {
          // We don't have a ref. Can't check if click inside or outside.
          console.warn("No current value for ref defined. Can't know if click is inside or outside.")
          return
        }
        if (insideRef.current.contains(event.target)) {
          // Click was inside. Don't run callback.
          return
        }
        callback()
      }

      document.addEventListener("click", handleDocumentClick)

      return function cleanUpClickOutsideHandling() {
        document.removeEventListener("click", handleDocumentClick)
      }
    }
  )
}
