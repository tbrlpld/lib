import React from 'react';


/**
 * Check is an element is on screen.
 *
 * Returns a boolean expressing the visibility and the ref to put on the element in question.
 */
function useIsOnscreen() {
  const elementRef = React.useRef();
  const [isOnScreen, setIsOnScreen] = React.useState(false);

  React.useEffect(
    () => {
      if (!elementRef.current) return

      const observer = new IntersectionObserver((entries) => {
        const [entry] = entries;

        // `entry.isIntersecting` will be true if the
        // element is in the viewport, false if not.
        setIsOnScreen(entry.isIntersecting)
      });

      observer.observe(elementRef.current);

      return () => {
        observer.disconnect();
      }
    },
    []
  )

  return [isOnScreen, elementRef];
}

export default useIsOnscreen;
