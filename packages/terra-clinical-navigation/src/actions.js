import { UPDATE } from './actionTypes';

export function update(key, data) {
  return { type: UPDATE, key, data };
}
