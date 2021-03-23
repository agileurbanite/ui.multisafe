import { InputAdornment, Typography } from '@material-ui/core'
import { BulletHeading } from '../../../../general/BulletHeading/BulletHeading';
import { ContentSeparator } from '../../../../../general/ContentSeparator/ContentSeparator'
import { Near } from '../../../../../general/icons/Near'
import { TextField } from '../../../../general/TextField/TextField'

export const Amount = ({ control, classNames, hasError, errorMessage }) => (
  <>
    <BulletHeading>Deposit funds</BulletHeading>
    <Typography className={classNames?.description}>
      To start work with your Multi Safe please deposit funds.
    </Typography>
    <section className={classNames?.createMultisafeBlock}>
      <TextField
        control={control}
        name="amount"
        variant="filled"
        label="Amount*"
        fullWidth
        defaultValue="0"
        className={classNames?.amountField}
        error={hasError}
        helperText={errorMessage}
        InputProps={{
          classes: {
            root: classNames.amountInputRoot,
          },
          endAdornment: (
            <InputAdornment position="end">
              <Near className={classNames?.icon} />
              <span className={classNames?.adornmentText}>NEAR</span>
            </InputAdornment>
          ),
        }}
      />
    </section>
    <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
  </>
);
