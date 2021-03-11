import { useFieldArray } from 'react-hook-form';
import { List, ListItem, Button, } from '@material-ui/core';
import { MultisafeField } from '../../../../general/MultisafeField/MultisafeField';
import { useStyles } from './MembersField.styles';


export const MembersField = ({ control, getValues, name }) => {
  const classes = useStyles();
  const { fields, append } = useFieldArray({ control, name });
  const appendMember = () => append([
    {
      memberName: getValues('memberName'),
      account_id: getValues('account_id')
    },
  ]);

  return <>
    <List className={classes.addMemberInputList}>
      {fields.map((item, idx) => (
        <ListItem key={item.id} className={classes.addMemberInput} disableGutters>
          <MultisafeField
            name={`members[${idx}].memberName`}
            control={control}
            defaultValue={item.memberName}
            label="Member Name"
            className={classes.memberName}
            variant="filled"
            fullWidth
          />
          <MultisafeField
            name={`members[${idx}].account_id`}
            control={control}
            defaultValue={item.account_id}
            label="Member Address"
            className={classes.memberAddress}
            variant="filled"
            fullWidth
          />

        </ListItem>
      ))}
    </List>
    <section className={classes.buttonContainer}>
      <Button
        type="button"
        variant="outlined"
        color="primary"
        className={classes.addButton}
        onClick={appendMember}>
        Add Member
      </Button>
    </section>
  </>
}
