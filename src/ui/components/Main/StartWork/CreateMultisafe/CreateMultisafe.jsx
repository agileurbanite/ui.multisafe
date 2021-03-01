import { Link, useHistory } from 'react-router-dom';
import { useFieldArray, useForm } from 'react-hook-form';
import { useStoreActions } from 'easy-peasy';
import { FormItemHeader } from '../../general/FormItem/FormItemHeader';
import { MultisafeField } from '../../general/hooks/MultisafeField';
import { Headline } from '../../../general/Headline/Headline';
import { routes } from '../../../../config/routes';
import { useStyles } from './CreateMultisafe.styles';

export const CreateMultisafe = () => {
  const classes = useStyles();
  const { push } = useHistory();
  const onCreateMultisafe = useStoreActions((a) => a.startWork.onCreateMultisafe);

  // Form template
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      name: '',
      members: [{ memberName: '', account_id: '' }],
      num_confirmations: 0,
      amount: 0,
    },
  });

  // Members field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'members',
  });

  const onSubmit = handleSubmit((data) => onCreateMultisafe({ data }));

  return (
    <div className={classes.container}>
      <button type="button" onClick={() => push(routes.getStarted)}>
        Back
      </button>
      <Headline is={1}>Create New Multi Safe.</Headline>
      <form autoComplete="off" onSubmit={onSubmit} className={classes.form}>
        <ul>
          <li className={classes.multisafeName}>
            <FormItemHeader
              headline="MultiSafe Name"
              subheader={`First, let's give your new Safe a name.
              This name is only stored locally and will never be shared.`}
            />
            <MultisafeField name="name" control={control} defaultValue="" label="Multi Safe Name" />
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
                    name={`members[${idx}].memberName`}
                    control={control}
                    defaultValue={item.memberName}
                    label="Member Name"
                  />
                  <MultisafeField
                    name={`members[${idx}].account_id`}
                    control={control}
                    defaultValue={item.account_id}
                    label="Member Address"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      remove(idx);
                    }}>
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
                    { memberName: getValues('memberName'), account_id: getValues('account_id') },
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
            <MultisafeField
              name="num_confirmations"
              control={control}
              defaultValue={0}
              label="Confirmations"
            />
          </li>

          <li className={classes.depositSection}>
            <FormItemHeader
              headline="Deposit funds"
              subheader={`
              To start work with your Multi Safe please deposit funds.
              `}
            />
            <MultisafeField name="amount" control={control} defaultValue={0} label="Amount" />
          </li>
        </ul>
        <button type="submit">Create multisafe</button>
        <span>Fee price 0 to create multisafe</span>
      </form>
    </div>
  );
};
