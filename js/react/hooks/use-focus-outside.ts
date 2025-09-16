import * as React from 'react'


/**
 * Hook to run callback when focus is outside the container element.
 *
 * Pass the callback to run when the focus moves outside.
 *
 * Add the returned ref and blur handler to the container element of interest.
 */
export default function useFocusOutside<Type extends HTMLElement> (
  callback: () => void,
): {
  ref: React.RefObject<Type | null>,
  handleBlur: (event: React.FocusEvent) => void,
} {
  const ref = React.useRef<Type | null>(null)


  function handleBlur (event: React.FocusEvent) {
    if (!ref.current || !event.relatedTarget) {return}

    const containerElement = ref.current as Type
    const newlyFocusedElement = event.relatedTarget as HTMLElement

    if (!containerElement.contains(newlyFocusedElement)) {
      callback()
    }
  }


  return {
    ref,
    handleBlur,
  }
}
