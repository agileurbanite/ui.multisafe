import { useFieldArray } from 'react-hook-form';
import { List, ListItem, Button, IconButton, Typography, FormHelperText } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { has } from 'ramda'
import { useStyles } from './MembersField.styles';
import { BulletHeading } from '../../../../general/BulletHeading/BulletHeading';
import { ContentSeparator } from '../../../../../general/ContentSeparator/ContentSeparator';
import { TextField } from '../../../../general/TextField/TextField';

export const MembersField = ({
  control,
  getValues,
  name,
  classNames,
  errors,
  hasError,
  errorMessage,
}) => {
  const classes = useStyles();
  const { fields, append, remove } = useFieldArray({ control, name });

  const appendMember = () => append([{ account_id: getValues('account_id') }]);

  const removeMember = (idx) => remove(idx);
  
  return (
    <>
      <BulletHeading>Members</BulletHeading>
      <Typography className={classNames?.description}>
        Your Safe will have one or more Members. We have prefilled the first Member with your
        connected wallet details, but you are free to change this to a different Member.
      </Typography>
      <Typography className={classNames?.description}>
        Add additional Members (e.g. wallets of your teammates). In general, the more confirmations
        required, the more secure is your Safe.
      </Typography>
      <section className={classNames?.createMultisafeBlock}>
        <List>
          {fields.map((item, idx) => (
            <ListItem key={item.id} disableGutters>
              <TextField
                control={control}
                name={`members[${idx}].account_id`}
                variant="filled"
                label="Member Address*"
                className={classes.memberAddress}
                fullWidth
                error={has('members', errors) && has(`members[${idx}].account_id`, errors)}
                helperText={has(`members[${idx}].account_id`, errors) ? errors.members[idx].account_id.message : null}
                InputProps={{
                  classes: {
                    root: classes.memberAddressInput,
                  },
                }}
              />
              <IconButton className={classes.iconButton} onClick={removeMember}>
                <DeleteIcon className={classes.icon} />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <section className={classes.buttonContainer}>
          <Button
            startIcon={<AddIcon />}
            type="button"
            variant="outlined"
            color="primary"
            className={classes.addButton}
            onClick={appendMember}>
            Add Member
          </Button>
          <FormHelperText id="members-validation-field" error={hasError}>
            {errorMessage}
          </FormHelperText>
        </section>
      </section>
      <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
    </>
  );
};
