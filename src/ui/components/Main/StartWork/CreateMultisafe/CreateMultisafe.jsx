import { useStyles } from './CreateMultisafe.styles';

export const CreateMultisafe = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1>Create New Multisafe</h1>
      <ul>
        <li>
          <h3>Multisafe Name</h3>
          <span>
            First, let&apos;s give your new Safe a name. This name is only stored locally and will
            never be shared.
          </span>
          <div>
            <input type="text" placeholder="Multisafe Name" />
          </div>
        </li>
        <li>
          <h3>Members</h3>
          <span>
            Your Safe will have one or more Members. We have prefilled the first Member with your
            connected wallet details, but you are free to change this to a different Member.
          </span>
          <br />
          <br />
          <span>
            Add additional Members (e.g. wallets of your teammates). In general, the more
            confirmations required, the more secure is your Safe.
          </span>
          <div>
            <input type="text" placeholder="Member Name" />
            <input type="text" placeholder="Member Address" />
          </div>
          <button type="submit">Add Member</button>
        </li>
        <li>
          <h3>Confirmations</h3>
          <span>
            Specify how many of them have to confirm a transaction before it gets executed. In
            general, the more confirmations required, the more secure is your Safe.
          </span>
          <div>
            <input type="number" placeholder="Confirmations" />
          </div>
          <span>of 1 owner(s)</span>
        </li>
        <li>
          <h3>Deposit Funds</h3>
          <span>To start work with your Multi Safe please deposit funds.</span>
          <div>
            <input type="text" placeholder="Amount" />
          </div>
        </li>
      </ul>

      <button type="submit">Create Multisafe</button>
    </div>
  );
};
