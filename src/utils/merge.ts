import React from 'react';

export const merge = <T extends object, U extends object>(target: T, source: U): T & U => {
  if (!target && !source) {
    return null as any;
  }

  const result = { ...(target || {}) } as T & U;

  for (const [key, value] of Object.entries(source || {})) {
    result[key as keyof (T & U)] =
      value &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      !(value instanceof Element) &&
      !React.isValidElement(value)
        ? merge(result[key as keyof (T & U)] as object, value as object)
        : value;
  }

  return result;
};
