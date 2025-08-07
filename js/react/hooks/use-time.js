import React from 'react';


/**
 * Get the time every given milliseconds.
 */
function useTime({interval: 1000}) {
  const [time, setTime] = React.useState(
    new Date()
  );

  React.useEffect(() => {
    const intervalId = window.setInterval(
      () => {
          setTime(new Date());
      },
      interval
    );

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return time;
}

export default useTime;
