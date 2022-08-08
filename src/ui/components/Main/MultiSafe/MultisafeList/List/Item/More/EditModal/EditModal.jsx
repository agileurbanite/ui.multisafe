import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Modal, Paper } from '@material-ui/core';
import cn from 'classnames';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';

import FormButton from '../../../../../../FormElements/FormButton/FormButton';
import { useStyles } from './EditModal.styles';
import { MultisafeName } from './MultisafeName/MultisafeName';
import { validationSchema } from './validationSchema';

export const EditModal = ({
    isOpenEditModal,
    closeEditModal,
    stopPropagation,
    multisafeId,
    name,
}) => {
    const changeMultisafeName = useStoreActions((actions) => actions.multisafe.changeMultisafeName);
    const classes = useStyles();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isValid, isDirty },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    });

    const onSubmit = handleSubmit((data) => {
        changeMultisafeName({ multisafeId, data });
        closeEditModal();
        reset(data);
    });

    return (
        <Modal
            onClick={stopPropagation}
            open={isOpenEditModal}
            onClose={closeEditModal}
            className={classes.modal}
        >
            <Paper className={classes.container}>
                <div className={classes.wrapper}>
                    <h2 className={classes.header}>Edit Multi Safe</h2>
                    <form onSubmit={onSubmit} className={classes.form}>
                        <MultisafeName
                            name={name}
                            control={control}
                            hasError={!!errors?.name}
                            errorMessage={!!errors?.name && errors?.name?.message}
                        />
                        <div className={classes.footer}>
                            <Button className={classes.cancel} onClick={closeEditModal}>
                Cancel
                            </Button>
                            <FormButton disabled={!isValid || !isDirty} className={cn(classes.cancel, classes.send)}>
                                Save
                            </FormButton>
                        </div>
                    </form>
                </div>
            </Paper>
        </Modal>
    );
};
