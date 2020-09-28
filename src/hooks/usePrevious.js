import {useEffect, useRef, useDebugValue} from 'react';

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  })

  useDebugValue(ref.current > 18 ? 'Twoo much': 'Too little')

  return ref.current;
}

export default usePrevious;