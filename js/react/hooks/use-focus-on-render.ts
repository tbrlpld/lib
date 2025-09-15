import * as React from 'react'


/**
 * Focus an element on the first render.
 *
 * Add the returned ref to the element you want to focus. The element must be
 * focusable.
 */
export default function useFocusOnRender<Type extends { focus: () => void }> (): React.Ref<Type> {
  const ref = React.useRef<Type>(null)

  React.useEffect(
    function focusInput () {
      if (!ref.current) {
        return
      }

      const el = ref.current as Type
      el.focus()
    },
    [],
  )

  return ref
}
