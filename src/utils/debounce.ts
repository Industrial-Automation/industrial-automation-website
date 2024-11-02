export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null;

  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (immediate && !timeout) {
      func(...args);
    }

    timeout = setTimeout(() => {
      if (!immediate) {
        func(...args);
      }
      timeout = null;
    }, wait);
  };
};
