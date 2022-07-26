import { FormHelperText, MenuItem, TextField, Typography } from '@material-ui/core';
import { ContentSeparator } from '@ui/components/general/ContentSeparator/ContentSeparator';
import { BulletHeading } from '@ui/components/Main/general/BulletHeading/BulletHeading';
import * as R from 'ramda';
import { useController, useWatch } from 'react-hook-form';


export const Confirmations = ({ control, classNames, hasError, errorMessage }) => {
    const watchedMembers = useWatch({
        control,
        name: 'members',
    }) || [];

    const {
        field: { ref, ...inputProps },
    } = useController({
        name: 'num_confirmations',
        control,
        rules: { required: true },
        defaultValue: '',
    });

    const membersCountList = R.addIndex(R.map)((_, idx) => idx + 1, watchedMembers);

    return (
        <>
            <BulletHeading>Confirmations</BulletHeading>
            <Typography className={classNames?.description}>
                Specify how many of them have to confirm a transaction before it gets executed. In general,
                the more confirmations required, the more secure is your Safe.
            </Typography>
            <section className={classNames?.createMultisafeBlock}>
                <TextField
                    id="select"
                    inputRef={ref}
                    variant="filled"
                    label="Confirmations*"
                    disabled={R.isEmpty(membersCountList)}
                    className={classNames?.confirmationsField}
                    select
                    error={hasError}
                    helperText={errorMessage}
                    {...inputProps}
                >
                    {membersCountList.map((idx) => (
                        <MenuItem
                            value={idx}
                            key={`confirmation-member-${idx}`}
                            className={classNames?.confirmationInput}>
                            {idx}
                        </MenuItem>
                    ))}
                </TextField>
                {!errorMessage && <FormHelperText id="filled-confirmation-helper-text">of 1 owner(s)</FormHelperText>}
            </section>
            <ContentSeparator bg="rgba(0, 0, 0, 0.87)" height={1} margin="24px 0" />
        </>
    );
};
