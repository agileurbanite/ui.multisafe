import { Typography } from '@material-ui/core';
import { TextField } from '../../../../general/TextField/TextField';
import { BulletHeading } from '../../../../general/BulletHeading/BulletHeading';
import { ContentSeparator } from '../../../../../general/ContentSeparator/ContentSeparator';

export const MultisafeName = ({ control, classNames, hasError, errorMessage }) => (
  <>
    <BulletHeading>Multi Safe Name</BulletHeading>
    <Typography className={classNames?.description}>
      First, let&apos;s give your new Safe a name. This name is only stored locally and will never
      be shared.
    </Typography>
    <section className={classNames?.createMultisafeBlock}>
      <TextField
        control={control}
        name="name"
        variant="outlined"
        placeholder="Multi Safe Name*"
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
    <Typography className={classNames?.description}>
      By continuing you consent to the terms of use and privacy policy.
    </Typography>
    <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
  </>
);
