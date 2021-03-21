import { WalletConnection } from 'near-api-js'
import { RedirectConnectedWalletAccount } from './redirect-connected-wallet';

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
