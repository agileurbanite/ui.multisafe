import qs from 'query-string';

export const routes = {
    // Technical
    root: '/',
    redirectFromWallet: '/redirect-from-wallet',
    // Pages
    welcome: '/welcome',
    getStarted: '/get-started',
    createMultisafe: '/create-multisafe',
    loadMultisafe: '/load-multisafe',
    dashboard: '/multisafe/:multisafeId/dashboard',
    history: '/multisafe/:multisafeId/history',
    members: '/multisafe/:multisafeId/members',
    remove: '/multisafe/:multisafeId/remove',
    disconnect: '/multisafe/:multisafeId/disconnect',
    nonFungibleTokens: '/multisafe/:multisafeId/nonFungibleTokens',
    safeEdit: '/multisafe/:multisafeId/edit-safe'
};

export const getRoute = {
    dashboard: (multisafeId) => `/multisafe/${multisafeId}/dashboard`,
    history: (multisafeId) => `/multisafe/${multisafeId}/history`,
    members: (multisafeId) => `/multisafe/${multisafeId}/members`,
    nonFungibleTokens: (multisafeId) => `/multisafe/${multisafeId}/nonFungibleTokens`,
    callbackUrl: (params) => `${window.location.origin}/redirect-from-wallet?${qs.stringify(params)}`,
    remove: (multisafeId) => `/multisafe/${multisafeId}/remove`,
    disconnect: (multisafeId) => `/multisafe/${multisafeId}/disconnect`,
    safeEdit: (multisafeId) => `/multisafe/${multisafeId}/edit-safe`,
};
