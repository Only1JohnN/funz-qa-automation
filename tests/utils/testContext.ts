import contextMapRaw from '../context/testContext.json';

const contextMap = contextMapRaw as Record<string, TestContext>;

export interface TestContext {
  description: string;
  impact: string;
  module: string;
}

export function getTestContext(testTitle: string): TestContext | null {
  // Try exact match
  if (contextMap[testTitle]) return contextMap[testTitle] as TestContext;
  
  // Try partial match (e.g., if title contains TC-06)
  const match = Object.keys(contextMap).find(key => testTitle.includes(key));
  if (match) return contextMap[match] as TestContext;
  
  return null;
}