import { Link } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { useStyles } from './CreateMultisafe.styles';
import { FormItemHeader } from '../../general/FormItem/FormItemHeader';
import { MultisafeField } from '../../general/hooks/MultisafeField';

export const CreateMultisafe = () => {
  const classes = useStyles();

  // Form hook
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: '',
      members: [{ account_id: '', public_key: '' }],
      num_confirmations: 0,
      amount: 0
    }
  });

  // Field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members'
  });

  const onSubmit = (data) => alert(JSON.stringify(data, null, 2));

  // const renderMember = ({ account_id }) => <span>{account_id}</span>

  return (
    <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <ul>
        <li className={classes.multisafeName}>
          <FormItemHeader
            headline="MultiSafe Name"
            subheader={`First, let's give your new Safe a name. 
              This name is only stored locally and will never be shared.`}
          />
          <MultisafeField name="name" control={control} defaultValue="" />
          <span>
            By continuing you consent to the <Link to="terms-of-use">terms of use</Link> and{' '}
            <Link to="privacy">privacy policy</Link>.
          </span>
        </li>

        <li className={classes.membersList}>
          <FormItemHeader
            headline="Members"
            subheader={`Your Safe will have one or more Members. 
              We have prefilled the first Member with your connected wallet details, 
              but you are free to change this to a different Member.`}
          />
          <div>
            Add additional Members (e.g. wallets of your teammates). In general, the more
            confirmations required, the more secure is your Safe.
          </div>

          <ul>
            {fields.map((item, idx) => (
              <li key={item.id} className={classes.addMemberInput}>
                <MultisafeField
                  name={`members[${idx}].account_id`}
                  control={control}
                  defaultValue={item.account_id}
                />
                <MultisafeField
                  name={`members[${idx}].public_key`}
                  control={control}
                  defaultValue={item.public_key}
                />

                <button type="button" onClick={() => remove(idx)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <section>
            <button
              type="button"
              onClick={() => {
                append([
                  { account_id: getValues('account_id'), public_key: getValues('public_key') }
                ]);
              }}>
              Add Member
            </button>
          </section>
        </li>

        <li className={classes.confirmations}>
          <FormItemHeader
            headline="Confirmations"
            subheader={`
              Specify how many of them have to confirm a transaction before it gets executed.
              In general, the more confirmations required, the more secure is your Safe.
              `}
          />
          <MultisafeField name="num_confirmations" control={control} defaultValue={0} />
        </li>

        <li className={classes.depositSection}>
          <FormItemHeader
            headline="Deposit funds"
            subheader={`
              To start work with your Multi Safe please deposit funds.
              `}
          />
          <MultisafeField name="amount" control={control} defaultValue={0} type="number" />
        </li>
      </ul>
      <button type="submit">Create multisafe</button>
      <span>Fee price 0 to create multisafe</span>
    </form>
  );
};
