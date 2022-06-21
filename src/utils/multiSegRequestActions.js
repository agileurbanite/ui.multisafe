
import CallMade from '@material-ui/icons/CallMade';
import Description from '@material-ui/icons/Description';
import Lock from '@material-ui/icons/Lock';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import PersonOutline from '@material-ui/icons/PersonOutline';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Security from '@material-ui/icons/Security';
import Send from '@material-ui/icons/Send';

// available actions are referenced from:
// https://github.com/near/core-contracts/tree/master/multisig2

export const MULT_SIG_REQUEST_ACTIONS = {
    Transfer: {
        label: 'Transfer Tokens',
        icon: CallMade,
    },
    CreateAccount: {
        label: 'Create Account',
        icon: Person,
    },
    DeployContract: {
        label: 'Deploy Contract',
        icon: Description,
    },
    AddMember: {
        label: 'Add Member',
        icon: PersonAdd, 
    },
    DeleteMember: {
        label: 'Remove Member',
        icon: PersonOutline,
    },
    AddKey: {
        label: 'Add Key',
        icon: Security,
    },
    FunctionCall: {
        label: 'Function Call',
        icon: Send,
    },
    SetNumConfirmations: {
        label: 'Set Number of Confirmations',
        icon: PlaylistAddCheckIcon,
    },
    SetActiveRequestsLimit: {
        label: 'Set Active Request Limit',
        icon: Lock,
    },
};
