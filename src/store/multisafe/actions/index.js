import { addMultisafe } from './addMultisafe';
import { changeMultisafeName } from './changeMultisafeName';
import { mountDashboard } from './mountDashboard';
import { mountHistory } from './mountHistory';
import { mountList } from './mountList';
import { mountMultisafe } from './mountMultisafe';
import { mountNonFungibleTokenList } from './mountNonFungibleTokenList';
import { mountTokenList } from './mountTokenList';
import { mountTokensMetadata } from './mountTokensMetadata';
import { removeMultisafe } from './removeMultisafe';

export const actions = {
    mountMultisafe,
    mountList,
    addMultisafe,
    mountDashboard,
    mountHistory,
    removeMultisafe,
    changeMultisafeName,
    mountTokensMetadata,
    mountTokenList,
    mountNonFungibleTokenList,
};
