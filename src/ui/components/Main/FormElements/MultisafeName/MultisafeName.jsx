import { Typography } from '@material-ui/core';
import { ContentSeparator } from '@ui/components/general/ContentSeparator/ContentSeparator';
import { BulletHeading } from '@ui/components/Main/general/BulletHeading/BulletHeading';
import { TextField } from '@ui/components/Main/general/TextField/TextField';

export const MultisafeName = ({ control, classNames, hasError, errorMessage, editVersion = false }) => (
    <>
        <BulletHeading>Multi Safe Name</BulletHeading>
        {editVersion ? (
            <Typography className={classNames?.description}>
        This name is only stored locally and will never be shared.
            </Typography>
        ) : (
            <Typography className={classNames?.description}>
        First, let&apos;s give your new Safe a name. This name is only stored locally and will never be shared.
            </Typography>
        )}
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
        <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
    </>
);
