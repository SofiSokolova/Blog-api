import * as crypto from 'crypto';

export function randomHash() {
  return crypto.randomBytes(32).toString('base64');
}
