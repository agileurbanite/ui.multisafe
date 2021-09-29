import { config } from '../near/config';

export const getMultisafeAccountId = (name) => `${name}.${config.multisafeFactoryId}`;
