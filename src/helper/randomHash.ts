import * as crypto from 'crypto';

export async function randomHash() {
  return crypto.randomBytes(32).toString('base64');
}
