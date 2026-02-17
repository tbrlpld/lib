import React from 'react';

/**
 * Return percentage number (0-100) of how far the viewport has been scrolled down.
 *
 * 0 means the viewport is at the top and not scrolled down.
 * 100 means the viewport is at the bottom and scrolled as far as possible.
 *
 * Browsers with overscroll behavior (like Safari) may produce values slightly outside the
 * 0 to 100 range.
 */
function useScrollPercentage() {
  const [scrollPercentage, setScrollPercentage] = React.useState(0)

  function updateScrollPercent() {
    const yScroll = window.scrollY
    const yScrollMax = document.body.scrollHeight - window.innerHeight
    const yScrollPerc = Math.round(yScroll / yScrollMax * 100)

    setScrollPercentage(yScrollPerc)
  }

  React.useEffect(
    function () {
      window.addEventListener("scroll", updateScrollPercent)

      return function () {
        window.removeEventListener("scroll", updateScrollPercent)
      }
    },
    []
  )

  return scrollPercentage
}