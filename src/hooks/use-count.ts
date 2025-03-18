import { useState, useEffect } from 'react';

export default function useCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount(count + 1);
      console.log('111 hook count', count);
    }, 2000);

    return () => clearTimeout(timer);
  }, [count]);

  return count;
}
