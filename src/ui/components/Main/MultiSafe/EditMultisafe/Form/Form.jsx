import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@material-ui/core';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { EditSafeSchema } from '../../../../../../utils/validation/EditMembersPage';
import { Confirmations } from '../../../FormElements/Confirmations/Confirmations';
import { MembersField } from '../../../FormElements/MembersField/MembersField';
import { MultisafeName } from '../../../FormElements/MultisafeName/MultisafeName';
import { useStyles } from './Form.styles';

export const Form = () => {
    const editVersion = true;
    const onEditMultisafe = useStoreActions((actions) => actions.multisafe.onEditMultisafe);
    const history = useHistory();
    const classes = useStyles();
    const name = useStoreState((state) => state.multisafe.general.name);
    const members = useStoreState((state) => state.multisafe.members || []);
    const numConfirmations = useStoreState((state) => state.multisafe.general.numConfirmations);

    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(EditSafeSchema),
        mode: 'all',
        defaultValues: {
            name,
            members: members.map((member) => ({
                account_id: member.accountId
            })),
            num_confirmations: numConfirmations
        }
    });

    const onSubmit = handleSubmit((data) => onEditMultisafe({ data, history }));

    return (
        <form autoComplete="off" className={classes.form} onSubmit={onSubmit}>
            <MultisafeName
                control={control}
                classNames={classes}
                hasError={!!errors?.name}
                errorMessage={!!errors?.name && errors?.name?.message}
                editVersion={editVersion}
            />
            <MembersField
                editVersion={editVersion}
                control={control}
                getValues={getValues}
                classNames={classes}
                name="members"
                errors={errors}
            />
            <Confirmations
                control={control}
                classNames={classes}
                hasError={!!errors?.num_confirmations}
                errorMessage={!!errors?.num_confirmations && errors?.num_confirmations?.message}
            />
            <Button type="submit" variant="contained" color="primary" className={classes.submitButton}>
                Send Request
            </Button>
        </form>
    );
};
