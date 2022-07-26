import { InputAdornment, Typography } from '@material-ui/core';
import { ContentSeparator } from '@ui/components/general/ContentSeparator/ContentSeparator';
import { Near } from '@ui/components/general/icons/Near';
import { BulletHeading } from '@ui/components/Main/general/BulletHeading/BulletHeading';
import { TextField } from '@ui/components/Main/general/TextField/TextField';
export const Amount = ({ control, classNames, hasError, errorMessage }) => (
    <>
        <BulletHeading>Deposit funds</BulletHeading>
        <Typography className={classNames?.description}>
      To start work with your Multi Safe please deposit funds. To create Multi Safe you need
      to have at least 5 NEAR
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
