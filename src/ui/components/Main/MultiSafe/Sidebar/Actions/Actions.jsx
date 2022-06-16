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
  const fungibleTokensBalances = useStoreState((s) => s.multisafe.general.fungibleTokensBalances);
  const fungibleTokensMetadata = useStoreState((s) => s.multisafe.general.fungibleTokensMetadata);
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
        {fungibleTokensBalances &&
         fungibleTokensMetadata && 
         fungibleTokensBalances.map((token) => {
          const metadata = fungibleTokensMetadata[token.contractName];
          return (
            metadata && 
            <span key={`balance-${metadata?.name}`}>
              {formatOtherBalance({...metadata, ...token})}
            </span>
          )})
        }   
      </div>

      {isMember ? <NewTransaction /> : <div className={classes.readOnly}>READ ONLY</div>}
    </div>
  );
};
