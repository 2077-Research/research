// Keep article reading independent of client hydration. Some managed Chrome
// profiles currently remove the hydrated application after the SSR page paints.
export const csr = false;
