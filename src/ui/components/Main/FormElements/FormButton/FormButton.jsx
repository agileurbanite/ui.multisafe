import { Button } from '@material-ui/core';
import { withRouter } from 'react-router';

const FormButton = ({ 
    children, 
    type='submit', 
    disabled = false,
    onClick,
    linkTo,
    history,
    className,
    variant,
    color = 'primary',
    sending = false,
    sendingString,
}) => (
    <Button
        type={type}
        variant={variant}
        color={color}
        className={className}
        disabled={disabled}
        onClick={(e) => {
            onClick && onClick(e);
            linkTo && (linkTo.toLowerCase().startsWith('http') ? window.open(linkTo, '_blank') : history.push(linkTo));
        }}
    >
        { 
            sending ? (sendingString ? sendingString : 'sending') : children
        }
    </Button>
);

export default withRouter(FormButton);
