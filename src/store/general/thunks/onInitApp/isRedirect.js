import qs from 'query-string';
import { matchPath } from 'react-router';
import { routes } from '../../../../ui/config/routes';

export const isRedirect = (state, history) => {
  console.log('aloha4')
  const { redirectAction } = qs.parse(history.location.search);

  const match = matchPath(history.location.pathname, {
    path: routes.redirectFromWallet,
    exact: true,
  });

  return (
    typeof redirectAction === 'string' &&
    match &&
    state.general.temporary.redirectAction === redirectAction
  );
};
