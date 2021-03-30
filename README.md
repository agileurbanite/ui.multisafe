### Intro

[Multi Safe](https://multisafe.io/) (further - App) - web application, which provides you with
the ability to create special groups of users for shared finance management and
participate in the existing ones in the NEAR Protocol (further - Blockchain).
This kind of apps also known as multi-signature apps.

By default, you start work as an anonymous user, which means that you are only able to load
some existing multisafes and read them (by calling _view methods_), but you can't create a
new one or do any actions (like approve transaction) with the loaded ones (by calling _change methods_)
even if you are a member of it. To use _change methods_ you should connect your wallet.
What does it mean? Let's make a little brief of how Blockchain works.

Generally, you can interact with Blockchain in 2 ways: view the data and the changes of the
blockchain and send some requests (transactions) to change it, like send some tokens to another
account or call some methods of a smart contract. For viewing data, you need no permissions
or account, all data is open for everyone on the internet. But if you want to change something
you can't do that anonymously.

Each change inside Blockchain such as sent tokens, create multisafe or add a new member to
it is a transaction - request with data, signed by the signer access key. Signer - an account
on behalf of which you create, sign and send a transaction into Blockchain. Signing transactions
allows us to identify the account and check if it satisfies all conditions like the account
have enough balance to send tokens or is a member of some specific multisafe when we want
to create a new request.

Now you know that to use _change methods_ you need to create and sign a transaction. But how to do this?

We use [near-api-js](https://github.com/near/near-api-js) (further - Library) for this.
We can create a transaction using the Library API like:

`const contract = new Contract(…);`

`await contract.add_request(…);`

The Library will sign it and send it to Blockchain automatically if we have the access key
(stored somewhere like in the browser local storage or in memory etc). But we don't store any
access key locally for some security reasons - it means, that the Library can't sign our
transaction for us. So how to sign it?

This is the reason why do we need to connect our app with Near Wallet (further - Wallet).
When the Library can't find the access key it redirects us to the Wallet and Wallet will
sign and send the transaction instead of App. This is the way how we interact with the Blockchain on the App.

###

### Installation

To start local development, follow these steps:

- Clone repository - `git clone https://github.com/multi-safe/ui.multisafe.git`
- Install all dependencies - `yarn install`
- Checkout to the dev branch and create your own branch
- Run project - `yarn start`

Now you will be able to use and develop the App on your local machine.

### General

The App is built atop of the Blockchain and Wallet and around the usage of smart-contracts:
the [multisig factory contract](https://github.com/near/core-contracts/tree/extend-multisig/multisig-factory)
and the [multisig contract](https://github.com/near/core-contracts/tree/extend-multisig/multisig2).
There are a few already deployed contrasts - you can load them in the App and get a look at
the App without creating your own one:

- eclipseeer-test-3.dev-1612259671980-4872321
- 2-confirms-elipseeer.dev-1612259671980-4872321

### Connect Wallet

Currently, we connecting our App with Waller by calling `WalletConnection.requestSignIn`.
But this is a deprecated method and it should be replaced. Currently, this method creates
a new function call assess key on every call - this is not what we want to do.
It is fixed start from near-api-js v 0.39.0

### Multisig Factory

For the creation of new multisig contracts, we use another smart contract - a multisig factory.
It creates a new account and uploads the contract code automatically when we call `create` method.
We already use one, but if you want to use your own, you can do it following the
instructions on the contract README and by using [NEAR CLI](https://github.com/near/near-cli)

### Multisig

We can interact with a multisig contract by calling it `view` and `change` methods. You can get
more details on this [README](https://github.com/near/core-contracts/blob/extend-multisig/multisig2/README.md).

### Architecture

Project separated by 2 big parts - `store` and `ui.`Store is an instance of
the [easy-peasy](https://easy-peasy.now.sh/) store and it is a place, where we
keep all project business logic such as `actions, selectors, thunks` etc.
For components, we use a tree-like file structure, which helps us navigate easily
through the project. The data transfer model looks like this:

`view methods: App <-> Blockchain`

`change methods: App <-> Wallet <-> Blockchain `

Also, we upload data before the page will be rendered.

### Testing

Currently, we have no tests.
