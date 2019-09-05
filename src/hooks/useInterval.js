import { useEffect, useRef } from "react";

// Source: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// What makes this hook special compared to setInterval is that it makes setInterval dynamic:
// You can adjust the speed on the fly, so speed could be state of the component that uses this hook.

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
