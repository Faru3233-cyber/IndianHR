
'use client';

import { useState, useEffect, type ReactNode } from 'react';

/**
 * A utility component that ensures its children are only rendered on the client side.
 * This is useful for preventing hydration mismatches with components that generate
 * unique IDs or rely on browser-specific APIs.
 */
export function ClientOnly({ children }: { children: ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Don't render anything on the server or during the initial client render
  }

  return <>{children}</>;
}
