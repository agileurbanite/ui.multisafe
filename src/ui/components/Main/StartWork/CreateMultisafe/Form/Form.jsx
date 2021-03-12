import { Button, FormHelperText, Typography } from '@material-ui/core'
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form'
import { useStyles } from './Form.styles';
import { MultisafeField } from '../../../general/MultisafeField/MultisafeField'
import { MembersField } from './MembersField/MembersField'
import { ContentSeparator } from '../../../../general/ContentSeparator/ContentSeparator'
import { Headline } from '../../../../general/Headline/Headline'

export const Form = () => {
  const onCreateMultisafe = useStoreActions(a => a.startWork.onCreateMultisafe);

  const { control, handleSubmit, getValues } = useForm();

  const classes = useStyles();

  const onSubmit = handleSubmit((data) => onCreateMultisafe({ data }));

  return (
    <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
      <Headline is={3}>Multi Safe Name</Headline>
      <Typography className={classes.description}>
        First, let&apos;s give your new Safe a name. This name is only stored locally and will never be shared.
      </Typography>
      <section className={classes.createMultisafeBlock}>
        <MultisafeField
          name="name"
          control={control}
          label="Multi Safe Name"
          variant="outlined"
          className={classes.textField}
          defaultValue=""
        />
      </section>
      <ContentSeparator
        bg="rgba(0, 0, 0, 0.87)"
        height={1}
        margin="24px 0"
      />
      <Headline is={3}>Members</Headline>
      <Typography className={classes.description}>
        Your Safe will have one or more Members. We have prefilled the first Member with your
        connected wallet details, but you are free to change this to a different Member.
      </Typography>
      <Typography className={classes.description}>
        Add additional Members (e.g. wallets of your teammates). In general,
        the more confirmations required, the more secure is your Safe.
      </Typography>
      <section className={classes.createMultisafeBlock}>
        <MembersField control={control} getValues={getValues} name="members" />
      </section>
      <ContentSeparator
        bg="rgba(0, 0, 0, 0.87)"
        height={1}
        margin="24px 0"
      />
      <Headline is={3}>Confirmations</Headline>
      <Typography className={classes.description}>
        Specify how many of them have to confirm a transaction before it gets executed. In general,
        the more confirmations required, the more secure is your Safe.
      </Typography>
      <section className={classes.createMultisafeBlock}>
        <MultisafeField
          name="num_confirmations"
          type="number"
          control={control}
          defaultValue="1"
          label="Confirmations"
          variant="filled"
          className={classes.confirmationsField}
        />
        <FormHelperText id="filled-confirmation-helper-text">of 1 owner(s)</FormHelperText>
      </section>
      <ContentSeparator
        bg="rgba(0, 0, 0, 0.87)"
        height={1}
        margin="24px 0"
      />
      <Headline is={3}>Deposit funds</Headline>
      <Typography className={classes.description}>
        To start work with your Multi Safe please deposit funds.
      </Typography>
      <section className={classes.createMultisafeBlock}>
        <MultisafeField
          type="number"
          name="amount"
          control={control}
          defaultValue="5"
          label="Amount"
          variant="filled"
          className={classes.confirmationsField}
        />

      </section>
      <ContentSeparator
        bg="rgba(0, 0, 0, 0.87)"
        height={1}
        margin="24px 0"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submitButton}
      >
        Create Multi Safe
      </Button>
      <Typography className={classes.description} align="center">
        Fee price 0000 to create Multi Safe
      </Typography>
    </form>
  )
}
