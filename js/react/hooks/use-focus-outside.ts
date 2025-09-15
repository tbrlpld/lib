import * as React from 'react'


/**
 * Hook to run callback when focus is outside of the container element.
 *
 * Pass the callback to run when the focus moves outside.
 *
 * Add the returned ref and blur handler to the container element of interest.
 */
export default function useFocusOutside (callback: () => void) {
  const focusOutsideContainerRef = React.useRef<HTMLElement>(null)


  function handleBlur (event: React.FocusEvent) {
    if (!focusOutsideContainerRef.current || !event.relatedTarget) {return}

    const formEl = focusOutsideContainerRef.current as HTMLFormElement
    const newlyFocusedElement = event.relatedTarget as HTMLElement

    if (!formEl.contains(newlyFocusedElement)) {
      callback()
    }
  }


  return {
    focusOutsideContainerRef: focusOutsideContainerRef,
    handleBlur,
  }
}
