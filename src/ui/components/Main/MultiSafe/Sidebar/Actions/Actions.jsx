import { useStoreState, useStoreActions } from 'easy-peasy';
import { CopyToClipboard } from '../../general/CopyToClipboard/CopyToClipboard';
import { OpenInExplorer } from '../../general/OpenInExplorer/OpenInExplorer';
import { RefreshFungibleTokens } from '../../general/RefreshFungibleTokens/RefreshFungibleTokens';
import { NewTransaction } from './NewTransaction/NewTransaction';
import { formatNearBalance, formatOtherBalance } from '../../../../../../utils/format';
import { useStyles } from './Actions.styles';

export const Actions = () => {

  const balance = useStoreState((s) => s.multisafe.general.balance);
  const multisafeId = useStoreState((s) => s.multisafe.general.multisafeId);
  const isMember = useStoreState((s) => s.multisafe.selectors.isMember);
  const fungibleTokens = useStoreState((s) => s.multisafe.general.fungibleTokens);
  const refreshFungibleTokens = useStoreActions((actions) => actions.multisafe.onMountTokenList);
  
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.tools}>
        <CopyToClipboard
          classNames={{ iconButton: classes.iconButton, icon: classes.icon }}
          accountId={multisafeId}
        />
        <OpenInExplorer
          classNames={{ iconButton: classes.iconButton, icon: classes.icon }}
          accountId={multisafeId}
          accountType="contract"
        />
        <RefreshFungibleTokens
          classNames={{ iconButton: classes.iconButton, icon: classes.icon }}
          refreshFungibleTokens={refreshFungibleTokens}
          accountId={multisafeId}
        />
      </div>

      <div className={classes.balance}>
        <span>{formatNearBalance(balance)}</span>
        {fungibleTokens && fungibleTokens.map((token) => <span key={token.name}>{formatOtherBalance(token)}</span>)}
      </div>

      {isMember ? <NewTransaction /> : <div className={classes.readOnly}>READ ONLY</div>}
    </div>
  );
};
