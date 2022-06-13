import { Typography } from '@material-ui/core';
import { TextField } from '../../general/TextField/TextField';
import { BulletHeading } from '../../general/BulletHeading/BulletHeading';
import { ContentSeparator } from '../../../general/ContentSeparator/ContentSeparator';

export const AccountId = ({ control, classNames, hasError, errorMessage, editVersion = false }) => (
  <>
    <BulletHeading>Multi Safe ID</BulletHeading>
    {!editVersion && 
      <Typography className={classNames?.description}>
        Second, choose Multi Safe ID. It is public and should be unique in the blockchain.
      </Typography>
    }
    <section className={classNames?.createMultisafeBlock}>
      <TextField
        control={control}
        name="multisafeId"
        variant="outlined"
        placeholder="Multi Safe ID*"
        fullWidth
        className={classNames?.textField}
        error={hasError}
        helperText={errorMessage}
        InputProps={{
          classes: {
            root: classNames.textFieldInputRoot,
            notchedOutline: classNames.textFieldInputNotchedOutline,
          },
        }}
      />
    </section>
    <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
  </>
);
