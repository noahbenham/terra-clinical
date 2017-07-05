export const DISCLOSE_NAVIGATION_CONTENT = 'DISCLOSE_NAVIGATION_CONTENT';

export function disclose(data) {
  return { type: DISCLOSE_NAVIGATION_CONTENT, data: data };
}
