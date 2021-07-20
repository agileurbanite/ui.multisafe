import ky from 'ky';
import { config } from '../../near/config';

export const getAccountIdsByPublicKey = (key) =>
  ky.get(`${config.helperUrl}/publicKey/${key}/accounts`, { timeout: 30000 }).json();
