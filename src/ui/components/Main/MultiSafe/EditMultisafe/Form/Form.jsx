import { yupResolver } from '@hookform/resolvers/yup';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { EditSafeSchema } from '../../../../../../utils/validation/EditMembersPage';
import { Confirmations } from '../../../FormElements/Confirmations/Confirmations';
import FormButton from '../../../FormElements/FormButton/FormButton';
import { MembersField } from '../../../FormElements/MembersField/MembersField';
import { MultisafeName } from '../../../FormElements/MultisafeName/MultisafeName';
import { ConfirmModal } from '../ConfirmModal/ConfirmModal';
import { useStyles } from './Form.styles';

export const Form = () => {
    const editVersion = true;
    const onEditMultisafe = useStoreActions((actions) => actions.multisafe.onEditMultisafe);
    const isBatchRequest = useStoreActions((actions) => actions.multisafe.isBatchRequest);
    const history = useHistory();
    const classes = useStyles();
    const name = useStoreState((state) => state.multisafe.general.name);
    const members = useStoreState((state) => state.multisafe.members || []);
    const numConfirmations = useStoreState((state) => state.multisafe.general.numConfirmations);

    const [isOpenConfirmModal, setOpenConfirmModal] = useState(false);
    const [formData, setFormData] = useState();
  
    const {
        control,
        handleSubmit,
        getValues,
        reset,
        formState: { errors, isValid, isDirty }
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
    
    const onSubmit = handleSubmit(async (data) => {
        if (await isBatchRequest({ data, history })) {
            setOpenConfirmModal(true);
            setFormData(data);
            return;
        }
        await onEditMultisafe({ data, history });
        reset(data);
    });

    return (
        <>
            <ConfirmModal
                isOpenConfirmModal={isOpenConfirmModal}
                closeRemoveModal={() => setOpenConfirmModal(false)}
                formData={formData}
            />
        
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
                <FormButton disabled={!isValid || !isDirty } variant="contained" className={classes.submitButton}>
                    Send Request
                </FormButton>
            </form>
        </>
    );
};
