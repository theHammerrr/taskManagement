import { useRef, useEffect } from "react"

type SomeFunction = (...args: any[]) => void;
type Timer = ReturnType<typeof setTimeout>

export function useDebounce<Func extends SomeFunction>(func: Func, delay: number) {
  const timer = useRef<Timer>();

  const debouncedFunction = (...args: any[]) => {
    const newTimer = setTimeout(() => {
      func(...args);
    }, delay);

    clearTimeout(timer.current);
    timer.current = newTimer
  }

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  return debouncedFunction
}