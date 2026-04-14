/**
 * Effect hook mirroring React.useEffect but skips running on mount.
 *
 * Normally `React.useEffect` will run when the component first mounts and then when the
 * dependencies change. Sometimes, you don't want that initial run on mount. This hook skips the
 * initial run, but runs on dependency changes.
 *
 * Based on Josh Comeau's solution:
 * https://courses.joshwcomeau.com/joy-of-react/bonus-job-hunting-kit/05.11-use-effect-skip-mount
 */
import React from 'react';


function useEffectSkipMount(callback, dependencies) {
  const callbackRef = React.useRef()
  callbackRef.current = callback

  const hasMountedRef = React.useRef(false)

  React.useEffect(
    function conditionalCallback() {
      if (!hasMountedRef.current) {
        // Component has not mounted yet.
        return
      }
      callbackRef.current()
    },
    [...dependencies],
  )

  React.useEffect(
    function trackMount () {
      // This only runs once during the lifetime of the component.
      hasMountedRef.current = true

      return function cleanUp() {
        // Clean up so we don't leave stale values in the ref.
        // This is important to make strict mode work correctly.
        hasMountedRef.current = false
      }
    },
    [], // Only run on first render.
  )
}


export default useEffectSkipMount;
