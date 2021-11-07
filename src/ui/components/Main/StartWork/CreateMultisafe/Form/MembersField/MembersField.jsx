import { useFieldArray } from 'react-hook-form';
import { List, ListItem, Button, IconButton, Typography } from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { useStyles } from './MembersField.styles';
import { BulletHeading } from '../../../../general/BulletHeading/BulletHeading';
import { ContentSeparator } from '../../../../../general/ContentSeparator/ContentSeparator';
import { TextField } from '../../../../general/TextField/TextField';

export const MembersField = ({ control, classNames, errors }) => {
  const { fields, append, remove } = useFieldArray({ control, name: 'members' });
  const classes = useStyles();

  const addMember = () => append({ account_id: '' });

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
          {fields.map((item, index) => (
            <ListItem key={item.id} disableGutters>
              <TextField
                control={control}
                name={`members[${index}].account_id`}
                variant="filled"
                label="Member Account ID*"
                className={classes.memberAddress}
                fullWidth
                error={Boolean(errors?.members?.[index]?.account_id)}
                helperText={errors?.members?.[index]?.account_id.message}
                InputProps={{
                  classes: {
                    root: classes.memberAddressInput,
                  },
                }}
              />
              {fields.length > 1 && (
                <IconButton className={classes.iconButton} onClick={() => remove(index)}>
                  <DeleteIcon className={classes.icon} />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
        <section>
          <Button
            startIcon={<AddIcon />}
            type="button"
            variant="outlined"
            color="primary"
            className={classes.addButton}
            onClick={addMember}
          >
            Add Member
          </Button>
        </section>
      </section>
      <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
    </>
  );
};
