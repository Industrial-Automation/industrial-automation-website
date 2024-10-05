import { ComponentType, lazy, Suspense } from 'react';

export const LazyLoadRoutes = (factor: () => Promise<{ default: ComponentType<unknown> }>) => {
  const LazyElement = lazy(factor);

  return (
    <Suspense fallback='Loading...'>
      <LazyElement />
    </Suspense>
  );
};

export default LazyLoadRoutes;
