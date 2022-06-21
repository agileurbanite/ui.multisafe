import { action } from 'easy-peasy';

export const setNearEntities = action((state, nearEntities) => {
    state.entities.near = nearEntities.near;
    state.entities.archivalRpc = nearEntities.archivalRpc;
    state.entities.wallet = nearEntities.wallet;
});
