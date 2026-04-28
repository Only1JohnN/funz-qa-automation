export function parsePlaywrightError(errorMsg: string): string {
  // 1. Remove ANSI color codes
  const cleanError = errorMsg.replace(/\x1b\[[0-9;]*m/g, '');
  
  // 2. Extract first meaningful line
  const firstLine = cleanError.split('\n')[0];
  
  // 3. Map common patterns to human‑friendly explanations
  if (firstLine.includes('toHaveText')) {
    return 'Expected text did not appear on the page (e.g., quantity number not updated).';
  }
  if (firstLine.includes('toBeVisible')) {
    return 'Expected element did not become visible within time limit.';
  }
  if (firstLine.includes('toHaveURL')) {
    return 'Page did not navigate to the correct URL.';
  }
  if (firstLine.includes('Timeout')) {
    return 'Action took too long – check network or backend response.';
  }
  if (firstLine.includes('locator resolved to 0 elements')) {
    return 'Element not found – UI might have changed.';
  }
  
  // Fallback: return cleaned first line (still technical but shorter)
  return firstLine;
}