export type RunMode = 'local' | 'smoke' | 'regression' | 'daily-smoke';

export const RUN_MODE = (process.env.RUN_MODE || 'local') as RunMode;

export const shouldSendReport = 
  RUN_MODE === 'smoke' || 
  RUN_MODE === 'regression' || 
  RUN_MODE === 'daily-smoke';

// Optional: only send on failure (to avoid spam)
export const sendOnlyOnFailure = false; // set false to always send summary