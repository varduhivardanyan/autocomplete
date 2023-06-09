import { useEffect, useRef } from 'react';

const useDebounce = () => {
  const timeout = useRef<NodeJS.Timeout>();

  const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => (
    ...args: T
  ) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    timeout.current = setTimeout(() => func(...args), delay);
  };

  useEffect(() => {
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, []);

  return { debounce };
};
  
export default useDebounce;