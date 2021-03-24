/* eslint-disable */
import { serialize } from 'borsh';
import { SCHEMA } from 'near-api-js/lib/transaction';
import { KeyPair } from 'near-api-js';
import { ConnectedWalletAccount } from '../api/ConnectedWalletAccount';

const LOGIN_WALLET_URL_SUFFIX = '/login/';
const LOCAL_STORAGE_KEY_SUFFIX = '_wallet_auth_key';
// browser storage key for a pending access key (i.e. key has been generated but we are not sure it was added yet)
const PENDING_ACCESS_KEY_PREFIX = 'pending_key';

export class WalletConnection {
  _walletBaseUrl;
  _authDataKey;
  _keyStore;
  _authData;
  _networkId;
  _near;
  _connectedAccount;

  constructor(near, appKeyPrefix) {
    this._near = near;
    const authDataKey = appKeyPrefix + LOCAL_STORAGE_KEY_SUFFIX;
    const authData = JSON.parse(window.localStorage.getItem(authDataKey));
    this._networkId = near.config.networkId;
    this._walletBaseUrl = near.config.walletUrl;
    this._keyStore = near.connection.signer.keyStore;
    this._authData = authData || { allKeys: [] };
    this._authDataKey = authDataKey;
    if (!this.isSignedIn()) {
      this._completeSignInWithAccessKey();
    }
  }

  /**
   * Returns true, if this WalletAccount is authorized with the wallet.
   * @example
   * walletAccount.isSignedIn();
   */
  isSignedIn() {
    return !!this._authData.accountId;
  }

  /**
   * Returns authorized Account ID.
   * @example
   * walletAccount.getAccountId();
   */
  getAccountId() {
    return this._authData.accountId || '';
  }

  /**
   * Redirects current page to the wallet authentication page.
   * @param contractId The NEAR account where the contract is deployed
   * @param title Name of the application that will appear as requesting access in Wallet
   * @param successUrl Optional url to redirect upon success
   * @param failureUrl Optional url to redirect upon failure
   *
   * @example
   *   walletAccount.requestSignIn(
   *     account-with-deploy-contract,
   *     "Guest Book",
   *     "https://example.com/success.html",
   *     "https://example.com/error.html");
   */
  async requestSignIn(contractId, title, successUrl, failureUrl) {
    if (
      this.getAccountId() ||
      (await this._keyStore.getKey(this._networkId, this.getAccountId()))
    ) {
      return Promise.resolve();
    }

    const currentUrl = new URL(window.location.href);
    const newUrl = new URL(this._walletBaseUrl + LOGIN_WALLET_URL_SUFFIX);
    newUrl.searchParams.set('title', title);
    newUrl.searchParams.set('contract_id', contractId);
    newUrl.searchParams.set('success_url', successUrl || currentUrl.href);
    newUrl.searchParams.set('failure_url', failureUrl || currentUrl.href);
    newUrl.searchParams.set('app_url', currentUrl.origin);
    const accessKey = KeyPair.fromRandom('ed25519');
    newUrl.searchParams.set('public_key', accessKey.getPublicKey().toString());
    await this._keyStore.setKey(
      this._networkId,
      PENDING_ACCESS_KEY_PREFIX + accessKey.getPublicKey(),
      accessKey,
    );
    window.location.assign(newUrl.toString());
  }

  /**
   * Requests the user to quickly sign for a transaction or batch of transactions
   * @param transactions Array of Transaction objects that will be requested to sign
   * @param callbackUrl The url to navigate to after the user is prompted to sign
   */
  async requestSignTransactions(transactions, callbackUrl) {
    const currentUrl = new URL(window.location.href);
    const newUrl = new URL('sign', this._walletBaseUrl);

    newUrl.searchParams.set(
      'transactions',
      transactions
        .map((transaction) => serialize(SCHEMA, transaction))
        .map((serialized) => Buffer.from(serialized).toString('base64'))
        .join(','),
    );
    newUrl.searchParams.set('callbackUrl', callbackUrl || currentUrl.href);

    window.location.assign(newUrl.toString());
  }

  /**
   * Complete sign in for a given account id and public key. To be invoked by the app when getting a callback from the wallet.
   */
  async _completeSignInWithAccessKey() {
    const currentUrl = new URL(window.location.href);
    const publicKey = currentUrl.searchParams.get('public_key') || '';
    const allKeys = (currentUrl.searchParams.get('all_keys') || '').split(',');
    const accountId = currentUrl.searchParams.get('account_id') || '';
    // TODO: Handle situation when access key is not added
    if (accountId && publicKey) {
      this._authData = {
        accountId,
        allKeys,
      };
      window.localStorage.setItem(this._authDataKey, JSON.stringify(this._authData));
      await this._moveKeyFromTempToPermanent(accountId, publicKey);
    }
    currentUrl.searchParams.delete('public_key');
    currentUrl.searchParams.delete('all_keys');
    currentUrl.searchParams.delete('account_id');
    window.history.replaceState({}, document.title, currentUrl.toString());
  }

  /**
   *
   * @param accountId The NEAR account owning the given public key
   * @param publicKey The public key being set to the key store
   */
  async _moveKeyFromTempToPermanent(accountId, publicKey) {
    const keyPair = await this._keyStore.getKey(
      this._networkId,
      PENDING_ACCESS_KEY_PREFIX + publicKey,
    );
    await this._keyStore.setKey(this._networkId, accountId, keyPair);
    await this._keyStore.removeKey(this._networkId, PENDING_ACCESS_KEY_PREFIX + publicKey);
  }

  /**
   * Sign out from the current account
   * @example
   * walletAccount.signOut();
   */
  signOut() {
    this._authData = {};
    window.localStorage.removeItem(this._authDataKey);
  }

  /**
   * Returns the current connected wallet account
   */
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
