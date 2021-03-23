import { WalletConnection } from 'near-api-js';
import { RedirectConnectedWalletAccount } from './RedirectConnectedWalletAccount';

export class ProgressiveWalletConnection extends WalletConnection {
  account() {
    if (!this._connectedAccount) {
      this._connectedAccount = new RedirectConnectedWalletAccount(
        this,
        this._near.connection,
        this._authData.accountId,
      );
    }
    return this._connectedAccount;
  }
}
