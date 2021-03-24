import { WalletConnection as NearWalletConnection } from 'near-api-js';
import { ConnectedWalletAccount } from './ConnectedWalletAccount';

export class WalletConnection extends NearWalletConnection {
  account() {
    if (!this._connectedAccount) {
      this._connectedAccount = new ConnectedWalletAccount(
        this,
        this._near.connection,
        this._authData.accountId,
      );
    }
    return this._connectedAccount;
  }
}
